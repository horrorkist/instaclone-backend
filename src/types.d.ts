import { PrismaClient, User } from "../src/generated/prisma/client";

type Context = {
  loggedInUser: User;
  client: PrismaClient;
};

export type QueryResponse = {
  ok: boolean;
  error?: string;
  [key: string]: any;
};

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => Promise<QueryResponse>;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
