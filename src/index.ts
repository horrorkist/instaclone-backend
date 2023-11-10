import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema.js";
import { getUserWithToken } from "./Users/users.utils.js";
import client from "./client.js";
import { getUploadUrl } from "./api/api.js";

const server = new ApolloServer({ schema });

startStandaloneServer(server, {
  listen: { port: Number(process.env.PORT || 4000) },
  context: async ({ req }) => ({
    loggedInUser: await getUserWithToken(req.headers.token),
    client,
  }),
}).then(({ url }) => {
  console.log("Server ready at: " + url);
});
