import { schema } from "./schema";
import { ApolloServer } from "apollo-server";

const server = new ApolloServer({
  schema: schema,
});

server.listen().then(async ({ url }) => {
  console.log(`\
🚀 Server ready at: ${url}
  `);
});
