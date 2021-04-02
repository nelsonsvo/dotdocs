import cors from "cors";
import { graphqlUploadExpress } from "graphql-upload";
import { join } from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { ApplicationResolver } from "./resolvers/Application";
import { FileResolver } from "./resolvers/File";
import { UserResolver } from "./resolvers/User";
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, ApplicationResolver, FileResolver],
  });
  const apolloServer = new ApolloServer({ schema, uploads: false });

  const app = express();
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
  app.use("/files", express.static(join(__dirname, "../files")));
  apolloServer.applyMiddleware({ app, cors: false });

  await createConnection().then(() => {
    console.log("typeorm connected");
  });

  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000/graphql`));
};

main().catch((err) => console.log(err));
