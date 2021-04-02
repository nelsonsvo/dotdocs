import { createWriteStream } from "fs";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { join } from "path";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { v4 } from "uuid";
import { AppField } from "../entities/AppField";
import { AppFile } from "../entities/AppFile";
import { FileField } from "../entities/FileField";
import { AppFieldInput } from "./../entities/AppField";
import { Application } from "./../entities/Application";
var fs = require("fs");

@Resolver()
export class FileResolver {
  @Mutation(() => AppFile)
  async singleUpload(
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename, mimetype }: FileUpload,
    @Arg("id", () => String) id: string
  ): Promise<AppFile> {
    {
      return new Promise(async (resolve, reject) => {
        const app = await Application.findOne({ id });
        if (app) {
          const guid = v4();
          const extension = mimetype.split("/")[1];

          createReadStream()
            .pipe(createWriteStream(__dirname + `/../../files/${app.name}/${guid}.${extension}`))
            .on("finish", async () => {
              let file = new AppFile();
              if (app) {
                file.application = app;
                file.filename = guid + "." + extension;
                file.mimetype = mimetype;
                file.old_filename = filename;
                let dir = join(__dirname, `/../../files/${app.name}/`);

                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir);
                }
                console.log(dir + filename);

                file.location = `/files/${app.name}/${guid}.${extension}`;

                file = await AppFile.save(file);
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
    @Arg("id") id: string
  ) {
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
  async getFiles(@Arg("id") id: string) {
    let app = await Application.find({ relations: ["files"] });
    app = app.filter((a: Application) => a.id === id);

    return app[0].files;
  }
}
