import { Resolvers } from "../../types.js";

const resolvers: Resolvers = {
  Query: {
    getUserByUserName: async (parent, { username }, { client }) => {
      const user = await client.user.findUnique({
        where: { username },
        include: { following: true, followers: true },
      });

      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }

      return {
        ok: true,
        user,
      };
    },
  },
};

export default resolvers;
