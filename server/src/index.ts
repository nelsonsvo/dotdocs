import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { graphqlUploadExpress } from "graphql-upload";
import { join } from "path";
import redis from "redis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { ApplicationResolver } from "./resolvers/Application";
import { FileResolver } from "./resolvers/File";
import { GroupResolver } from "./resolvers/Group";
import { UserResolver } from "./resolvers/User";
import { MyContext } from "./types/ContextType";

dotenv.config();
declare module "express-session" {
  interface Session {
    userId: string;
    userType: string;
  }
}

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

const main = async () => {
  const app = express();

  console.log(process.env.SECRET!);

  app.use(
    cors({
      origin: process.env.DOT_DOCS_CLIENT_URL,
      credentials: true,
    })
  );
  app.use(
    session({
      name: "uid",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 30, // 30mins
        httpOnly: true, //accessible in frontend client?
        secure: false, //only works in https?
        sameSite: "lax", //protect against csrf
      },
      saveUninitialized: false,

      secret: process.env.SECRET!,
      resave: false,
    })
  );

  const schema = await buildSchema({
    resolvers: [UserResolver, ApplicationResolver, FileResolver, GroupResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    uploads: false,
    context: ({ req, res }): MyContext => ({ req, res }),
  });

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  app.use("/files", express.static(join(__dirname, "../files")));
  apolloServer.applyMiddleware({ app, cors: false });

  await createConnection().then(() => {
    console.log("typeorm connected");
  });

  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000/graphql`));
};

main().catch((err) => console.log(err));
