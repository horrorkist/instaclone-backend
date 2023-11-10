import { Resolvers } from "../../types.js";

const resolvers: Resolvers = {
  Query: {
    getUserByusername: async (parent, { username }, { client }) =>
      await client.user.findUnique({ where: { username } }),
  },
};

export default resolvers;
