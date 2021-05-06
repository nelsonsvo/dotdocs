import { ApolloError } from "apollo-client";
import { AuthenticationError } from "apollo-server-errors";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Group } from "../entities/Group";
import { MyContext } from "./../types/ContextType";

@Resolver()
export class GroupResolver {
  @Query(() => [Group])
  async groups() {
    const res = await Group.find();

    console.log(res);

    return res;
  }

  @Mutation(() => Group)
  async createGroup(
    @Arg("name") name: string,
    @Arg("permissions", () => [String]) permissions: string[],
    @Ctx() { req, res }: MyContext
  ) {
    if (!req.session.userId) {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT AUTHENTICATED");
    }
    try {
      let group = Group.create({ name, permissions });
      group = await Group.save(group);
      return group;
    } catch {
      throw new ApolloError({
        errorMessage: "Failed to create group",
      });
    }
  }

  @Mutation(() => Boolean)
  async deleteGroup(@Arg("id") id: string, @Ctx() { req, res }: MyContext) {
    if (!req.session.userId) {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT AUTHENTICATED");
    }
    try {
      try{
        await Group.delete(id);
        return true
      } 
    } catch {
      throw new ApolloError({
        errorMessage: "Failed to create group",
      });

      return false
    }
  }
}
