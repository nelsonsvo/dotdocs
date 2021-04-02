"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const graphql_upload_1 = require("graphql-upload");
const path_1 = require("path");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Application_1 = require("./resolvers/Application");
const File_1 = require("./resolvers/File");
const User_1 = require("./resolvers/User");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const main = () => __awaiter(this, void 0, void 0, function* () {
    const schema = yield type_graphql_1.buildSchema({
        resolvers: [User_1.UserResolver, Application_1.ApplicationResolver, File_1.FileResolver],
    });
    const apolloServer = new ApolloServer({ schema, uploads: false });
    const app = express();
    app.use(cors_1.default({
        origin: "*",
        credentials: true,
    }));
    app.use(graphql_upload_1.graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
    app.use("/files", express.static(path_1.join(__dirname, "../files")));
    apolloServer.applyMiddleware({ app, cors: false });
    yield typeorm_1.createConnection().then(() => {
        console.log("typeorm connected");
    });
    app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000/graphql`));
});
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map