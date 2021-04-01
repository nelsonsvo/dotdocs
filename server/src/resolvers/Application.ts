import { ApolloError } from "apollo-client";
import { createWriteStream } from "fs";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppField } from "../entities/AppField";
import { AppFile } from "../entities/AppFile";
import { FileField } from "../entities/FileField";
import { AppFieldInput } from "./../entities/AppField";
import { Application } from "./../entities/Application";

@Resolver()
export class ApplicationResolver {
  @Query(() => [Application])
  async applications() {
    const apps = await Application.find({ relations: ["fields"] });
    return apps;
  }

  @Mutation(() => Application)
  async createApplication(
    @Arg("name") name: string,
    @Arg("fields", () => [AppField]) fields: AppField[]
  ) {
    try {
      let app = Application.create({ name, fields: fields });
      app = await Application.save(app);
      return app;
    } catch (e) {
      throw new ApolloError({
        errorMessage: e,
      });
    }
  }

  @Mutation(() => Boolean)
  async deleteApplication(@Arg("id") id: string) {
    try {
      await Application.delete({ id });
      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => AppFile)
  async singleUpload(
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename, mimetype }: FileUpload,
    @Arg("id", () => String) id: string
  ): Promise<AppFile> {
    {
      return new Promise(async (resolve, reject) =>
        createReadStream()
          .pipe(createWriteStream(__dirname + `/../../files/${filename}`))
          .on("finish", async () => {
            let file = new AppFile();
            const app = await Application.findOne({ id });
            if (app) {
              file.application = app;
              file.filename = filename;
              file.mimetype = mimetype;
              file.location = `/files/${filename}`;

              file = await AppFile.save(file);
            }
            console.log(file);
            resolve(file);
          })
          .on("error", () => reject())
      );
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
