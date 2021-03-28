import { ApolloError } from "apollo-client";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppField } from "../entities/AppField";
import { Application } from "./../entities/Application";

@Resolver()
export class ApplicationResolver {
  @Query(() => [Application])
  async applications() {
    return Application.find();
  }

  @Mutation(() => Application)
  async createApplication(
    @Arg("name") name: string,
    @Arg("fields", (type) => [AppField]) fields: AppField[]
  ) {
    try {
      const app = Application.create({ name, fields: fields });
      return await Application.save(app);
    } catch (e) {
      throw new ApolloError({
        errorMessage: e,
      });
    }
  }
}
