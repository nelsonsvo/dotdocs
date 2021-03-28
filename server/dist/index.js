"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./resolvers/User");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const main = () => __awaiter(this, void 0, void 0, function* () {
    const schema = yield type_graphql_1.buildSchema({ resolvers: [User_1.UserResolver] });
    const apolloServer = new ApolloServer({ schema });
    const app = express();
    apolloServer.applyMiddleware({ app });
    yield typeorm_1.createConnection().then(() => {
        console.log("typeorm connected");
    });
    app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000/graphql`));
});
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map