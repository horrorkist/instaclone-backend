import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
export default {
  User: {
    totalFollowing: ({ id }, _, { client }: { client: PrismaClient }) =>
      client.user.count({
        where: {
          followers: { some: { id } },
        },
      }),
    totalFollowers: ({ id }, _, { client }: { client: PrismaClient }) =>
      client.user.count({
        where: {
          following: { some: { id } },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => id === loggedInUser?.id,
    isFollowing: async (
      { id },
      _,
      { loggedInUser, client }: { loggedInUser: User; client: PrismaClient }
    ) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
  },
};
