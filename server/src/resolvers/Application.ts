import { ApolloError } from "apollo-client";
import { createWriteStream } from "fs";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppField } from "../entities/AppField";
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
    { createReadStream, filename }: FileUpload
  ): Promise<boolean> {
    {
      return new Promise(async (resolve, reject) =>
        createReadStream()
          .pipe(createWriteStream(__dirname + `/../../images/${filename}`))
          .on("finish", () => resolve(true))
          .on("error", (e) => {
            console.log(e);
            reject(false);
          })
      );
    }
  }
}
