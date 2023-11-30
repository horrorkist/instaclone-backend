import { Resolvers } from "../../types.js";

const resolvers: Resolvers = {
  Query: {
    getUserByUserName: async (parent, { username }, { client }) => {
      const user = await client.user.findUnique({
        where: { username },
        include: {
          following: {
            select: {
              avatar: true,
              username: true,
              bio: true,
            },
          },
          followers: {
            select: {
              avatar: true,
              username: true,
              bio: true,
            },
          },
        },
      });

      console.log("asdf: ", user);

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
