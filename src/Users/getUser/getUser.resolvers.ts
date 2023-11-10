import { Resolvers } from "../../types.js";

const resolvers: Resolvers = {
  Query: {
    getUserByUserName: async (parent, { userName }, { client }) =>
      await client.user.findUnique({ where: { userName } }),
  },
};

export default resolvers;
