import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { ApplicationResolver } from "./resolvers/Application";
import { UserResolver } from "./resolvers/User";
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const main = async () => {
  const schema = await buildSchema({ resolvers: [UserResolver, ApplicationResolver] });
  const apolloServer = new ApolloServer({ schema });

  const app = express();
  apolloServer.applyMiddleware({ app });

  await createConnection().then(() => {
    console.log("typeorm connected");
  });

  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000/graphql`));
};

main().catch((err) => console.log(err));
