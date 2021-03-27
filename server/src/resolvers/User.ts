import { PrismaClient } from "@prisma/client";
import { extendType, objectType, queryType } from "nexus";
import { Context } from "../context";

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.string("name");
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("users", {
      type: "User",
      resolve: (_root, _args, ctx: Context) => {
        return ctx.prisma.user.findMany();
      },
    });
    t.string("hello", { resolve: () => "hello world" });
  },
});
