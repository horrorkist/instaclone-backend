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
import "dotenv/config";

interface MyContext {
  loggedInUser: any;
  client: any;
}

const app = express();
app.use(logger("dev"));
const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
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

const isProd = process.env.NODE_ENV === "production";
const allowIntrospection =
  process.env.ALLOW_INTROSPECTION === "true" || !isProd;

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
  introspection: allowIntrospection,
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
  "/graphql",
  cors<cors.CorsRequest>({
    origin: [
      "http://localhost:5173",
      "https://app.horrorkist.com",
      "https://horrorkist.com",
    ],
    credentials: true,
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

const port = Number(process.env.PORT) || 4000;

await new Promise<void>((resolve) =>
  httpServer.listen({ port, host: "0,0,0,0" }, resolve)
);
console.log(`🚀 Server ready at http://0.0.0.0:${port}/graphql`);
