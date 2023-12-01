import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.js";
import { getUserWithToken } from "./Users/users.utils.js";
import client from "./client.js";
import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import logger from "morgan";

interface MyContext {
  loggedInUser: any;
  client: any;
}

const app = express();
app.use(logger("dev"));
const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
});

const serverCleanup = useServer(
  {
    schema,
    onConnect: async (ctx) => {
      const {
        connectionParams: { token },
      } = ctx;
      if (!token) {
        throw new Error("Token missing.");
      }
    },
    context: async (ctx) => {
      const {
        connectionParams: { token },
      } = ctx;
      const loggedInUser = await getUserWithToken(token);
      return {
        loggedInUser: loggedInUser,
      };
    },
  },
  wsServer
);

const server = new ApolloServer({
  schema,

  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

app.use(
  "/",
  cors<cors.CorsRequest>({
    origin: "*",
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      return {
        loggedInUser: await getUserWithToken(req.headers.token as string),
        client,
      };
    },
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/`);
