export default {
  Query: {
    getFollowing: async (_, { username, lastId }, { client }) => {
      try {
        const ok = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!ok) {
          return {
            ok: false,
            error: "User not found.",
          };
        }
        const following = await client.user
          .findUnique({ where: { username } })
          .following({
            take: 5,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { id: lastId } }),
          });
        return {
          ok: true,
          following,
          lastId: following[following.length - 1]?.id,
        };
      } catch (error) {
        return {
          ok: false,
          error: "Cannot get following.",
        };
      }
    },
  },
};
