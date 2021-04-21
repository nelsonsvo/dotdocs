import { AuthenticationError } from "apollo-server-errors";
import { createWriteStream } from "fs";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { join } from "path";
import { MyContext } from "src/types/ContextType";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { v4 } from "uuid";
import { AppField } from "../entities/AppField";
import { AppFile } from "../entities/AppFile";
import { FileField } from "../entities/FileField";
import { Application } from "./../entities/Application";
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

  @Field(() => String)
  name: string;
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
          res.statusCode = 400;
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
        newField.field = appField;
        newField.name = appField.name;
        newField.value = field.value;
        newField.file = file;
        FileField.save(newField);
      }
    });
    return true;
  }

  //get the associate files for application
  @Query(() => [AppFile])
  async getFiles(
    @Arg("id") id: string,
    // @Arg("fields", () => [AppFieldSearchInput]) fields: AppFieldSearchInput[],
    @Ctx() { req, res }: MyContext
  ) {
    if (!req.session.userId) {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT LOGGED IN");
    }
    const appFile = await AppFile.find({
      where: {
        application: id,
        // fields: fields,
      },
    });

    return appFile;
  }
}
