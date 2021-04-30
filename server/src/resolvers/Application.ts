import { ApolloError } from "apollo-client";
import { AuthenticationError } from "apollo-server-errors";
import { MyContext } from "src/types/ContextType";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Application } from "./../entities/Application";

// the input for creating an appfield.
@InputType("AppFieldCreateInput")
export class AppFieldCreateInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  type: string;

  @Field(() => Number)
  max_length: number;

  @Field(() => [String], { nullable: true })
  picklist_values?: string[];
}

@Resolver()
export class ApplicationResolver {
  @Query(() => [Application])
  async applications(@Ctx() { req, res }: MyContext) {
    if (!req.session.userId) {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT AUTHENTICATED");
    }
    const apps = await Application.find({ relations: ["fields"] });
    return apps;
  }

  @Mutation(() => Application)
  async createApplication(
    @Arg("name") name: string,
    @Arg("fields", () => [AppFieldCreateInput]) fields: AppFieldCreateInput[],
    @Ctx() { req, res }: MyContext
  ) {
    if (!req.session.userId) {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT AUTHENTICATED");
    }
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
  async deleteApplication(@Arg("id") id: string, @Ctx() { req, res }: MyContext) {
    if (!req.session.userId) {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT AUTHENTICATED");
    }
    try {
      await Application.delete({ id });
      return true;
    } catch {
      return false;
    }
  }
}
