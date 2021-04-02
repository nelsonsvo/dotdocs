import { ApolloError } from "apollo-client";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppField } from "../entities/AppField";
import { Application } from "./../entities/Application";
var fs = require("fs");

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
}
