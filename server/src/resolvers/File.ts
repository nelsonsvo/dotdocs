import { ApolloError } from "apollo-client";
import { AuthenticationError } from "apollo-server-errors";
import { createWriteStream } from "fs";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { join } from "path";
import { MyContext } from "src/types/ContextType";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { getManager, In } from "typeorm";
import { v4 } from "uuid";
import { AppField } from "../entities/AppField";
import { AppFile } from "../entities/AppFile";
import { FileField } from "../entities/FileField";
import { Application } from "./../entities/Application";
import { Remark } from "./../entities/Remark";
let fs = require("fs");

@InputType("AppFieldInput")
export class AppFieldInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  value: string;
}
@InputType("AppFieldSearchInput")
export class AppFieldSearchInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  value: string;
}

@ObjectType()
export class ApplicationFile {
  @Field(() => AppFile)
  file: AppFile;

  @Field(() => [FileField])
  fields: FileField[];
}

@Resolver()
export class FileResolver {
  @Mutation(() => AppFile)
  async singleUpload(
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename, mimetype }: FileUpload,
    @Arg("id", () => String) id: string,
    @Ctx() { req, res }: MyContext
  ): Promise<AppFile> {
    {
      return new Promise(async (resolve, reject) => {
        if (!req.session.userId) {
          res.statusCode = 401;
          throw new AuthenticationError("USER NOT AUTHENTICATED");
        }

        const app = await Application.findOne({ id });
        console.log(app);
        if (app) {
          const guid = v4();

          let dir = join(__dirname, `/../../files/${app.name}`);

          try {
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }
          } catch (err) {
            console.log("error creating directories", err);
          }
          const fileExtension = filename.split(/\.(?=[^\.]+$)/)[1];
          const newFileName = guid + "." + fileExtension;

          createReadStream()
            .pipe(createWriteStream(dir + `/${newFileName}`))
            .on("finish", async () => {
              let file = new AppFile();
              if (app) {
                file.application = app;
                file.filename = newFileName;
                file.mimetype = mimetype;
                file.old_filename = filename;

                console.log(dir + filename);

                file.location = `/files/${app.name}/${file.filename}`;
                try {
                  file = await AppFile.save(file);
                } catch (err) {
                  console.log(err);
                  reject();
                }
              }
              console.log(file);
              resolve(file);
            })
            .on("error", () => reject());
        } else {
          reject();
        }
      });
    }
  }

  @Mutation(() => Boolean)
  async indexFile(
    @Arg("fields", () => [AppFieldInput]) fields: [AppFieldInput],
    @Arg("id") id: string,
    @Ctx() { req, res }: MyContext
  ) {
    if (!req.session.userId) {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT LOGGED IN");
    }
    console.log(id);
    fields.forEach(async (field) => {
      const newField = new FileField();

      const appField = await AppField.findOne({ id: field.id });
      const file = await AppFile.findOne({ id });
      if (file && appField) {
        const id = v4();
        newField.id = id;
        newField.field = appField;
        newField.name = appField.name;
        newField.value = field.value;
        newField.value_id_string = newField.field.id + "_" + field.value;
        newField.file = file;

        FileField.save(newField);
      }
    });
    return true;
  }
  @Mutation(() => Boolean)
  async deleteFiles(@Arg("id", () => [String]) id: string[], @Ctx() { req, res }: MyContext) {
    if (!req.session.userId) {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT LOGGED IN");
    }

    try {
      AppFile.delete(id);
      return true;
    } catch {
      return false;
    }
  }

  //get the associate files for application
  @Query(() => [AppFile])
  async getFiles(
    @Arg("id") id: string,
    @Arg("fields", () => [AppFieldSearchInput]) fields: AppFieldSearchInput[],
    @Ctx() { req, res }: MyContext
  ) {
    if (!req.session.userId) {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT LOGGED IN");
    }

    let concatValues: string[] = [];

    let allNull = true;

    fields.map((f: any) => {
      if (f.value !== "") {
        concatValues = [...concatValues, f.id + "_" + f.value];
        allNull = false;
      }
    });

    //if all search fields are null return all the files
    if (allNull) {
      return await AppFile.find({ where: { application: id } });
    } else {
      console.log("concatValues", concatValues);

      const entityManager = getManager();

      let PARAMS = "";
      let param_arr = [];
      concatValues.forEach((val: any, index: number) => {
        var num = index + 1;
        PARAMS += "$" + num + ",";

        param_arr.push(val);
      });

      param_arr.push(concatValues.length);

      console.log("params", PARAMS);

      const lastParam = concatValues.length + 1;
      const fieldResults = await entityManager.query(
        `SELECT
      "file"."id" AS "file_id",
      "file"."filename" AS "file_filename",
      "file"."old_filename" AS "file_old_filename",
      "file"."mimetype" AS "file_mimetype",
      "file"."location" AS "file_location",
      "file"."createdAt" AS "file_createdAt",
      "file"."updatedAt" AS "file_updatedAt",
      "file"."applicationId" AS "file_applicationId"
    FROM
      "file_field" "field"
      LEFT JOIN "app_file" "file" ON "file"."id" = "field"."fileId"
    WHERE
      "field"."value_id_string" IN (${PARAMS.substring(0, PARAMS.length - 1)})
    GROUP BY
      "file"."id"
    HAVING
      count(DISTINCT "field"."value_id_string") = ${"$" + lastParam}`,
        param_arr
      );

      console.log(fieldResults);

      let appIds: string[] = [];

      fieldResults.forEach((file: any) => {
        if (!appIds.includes(file.file_id)) {
          appIds.push(file.file_id);
        }
      });

      console.log(appIds);
      const res = await AppFile.find({
        relations: ["fields", "fields.field"],
        where: {
          id: In(appIds),
        },
      });
      return res;
    }
  }
  @Mutation(() => Remark || Boolean)
  async addRemark(
    @Arg("id") id: string,
    @Arg("message") message: string,
    @Arg("author") author: string,
    @Ctx() { req, res }: MyContext
  ) {
    if (!req.session.userId) {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT LOGGED IN");
    }

    try {
      const file = await AppFile.findOne(id);

      const remark = Remark.create({
        file,
        message: message,
        author: author,
      });

      await Remark.save(remark);

      return remark;
    } catch {
      return false;
    }
  }

  @Query(() => [Remark])
  async getRemarks(
    @Arg("id") id: string,

    @Ctx() { req, res }: MyContext
  ) {
    if (!req.session.userId) {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT LOGGED IN");
    }

    try {
      const remarks = await Remark.find({
        where: {
          file: id,
        },
      });

      console.log(remarks);

      return remarks;
    } catch {
      throw new ApolloError({ errorMessage: "there was an error fetching remarks" });
    }
  }
}
