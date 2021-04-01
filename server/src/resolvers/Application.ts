import { ApolloError } from "apollo-client";
import { createWriteStream } from "fs";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppField } from "../entities/AppField";
import { AppFile } from "../entities/AppFile";
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

  @Mutation(() => Boolean)
  async singleUpload(
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename, mimetype }: FileUpload,
    @Arg("id", () => String) id: string
  ): Promise<boolean> {
    {
      return new Promise(async (resolve, reject) =>
        createReadStream()
          .pipe(createWriteStream(__dirname + `/../../files/${filename}`))
          .on("finish", async () => {
            const app = await Application.findOne({ id });
            if (app) {
              const file = new AppFile();

              file.application = app;
              file.filename = filename;
              file.mimetype = mimetype;
              file.location = `/../../files/${filename}`;

              AppFile.save(file);
            }

            resolve(true);
          })
          .on("error", () => reject(false))
      );
    }
  }

  //get the associate files for application
  @Query(() => [AppFile])
  async getFiles(@Arg("id") id: string) {
    let app = await Application.find({ relations: ["files"] });
    app = app.filter((a: Application) => a.id === id);

    return app[0].files;
  }
}
