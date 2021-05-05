import { ApolloError } from "apollo-client";
import { AuthenticationError } from "apollo-server-errors";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Group } from "../entities/Group";
import { User } from "../entities/User";
import { MyContext } from "./../types/ContextType";

@Resolver()
export class GroupResolver {
  @Query(() => [Group])
  async groups() {
    return Group.find();
  }

  @Mutation(() => User)
  async createGroup(
    @Arg("name") name: string,
    @Arg("permissions", (type) => [String]) permissions: string[],
    @Ctx() { req, res }: MyContext
  ) {
    if (!req.session.userId) {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT AUTHENTICATED");
    }
    try {
      const group = Group.create({ name, permissions });
      return group;
    } catch {
      throw new ApolloError({
        errorMessage: "Failed to create group",
      });
    }
  }
}
