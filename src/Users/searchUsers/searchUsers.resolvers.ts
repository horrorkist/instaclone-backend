import { PrismaClient } from "@prisma/client";
export default {
  Query: {
    searchUsers: async (
      _,
      { keyword, lastId },
      { client }: { client: PrismaClient }
    ) => {
      try {
        const users = await client.user.findMany({
          where: {
            username: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
        return {
          ok: true,
          users,
          lastId: users[users.length - 1]?.id,
        };
      } catch (error) {
        return {
          ok: false,
          error: "Cannot search users.",
        };
      }
    },
  },
};
