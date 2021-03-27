import { PrismaClient } from "@prisma/client";
import { extendType, makeSchema, mutationType, objectType, queryType } from "nexus";
import { join } from "path";
import { User, UserQuery } from "./resolvers/User";

export const schema = makeSchema({
  types: [UserQuery, User],
  outputs: {
    schema: `${__dirname}/generated/schema.graphql`,
    typegen: `${__dirname}/generated/types.ts`,
  },
  contextType: {
    module: require.resolve("./context.ts"),
    export: "Context",
  },
});
