import { PrismaClient } from "@prisma/client";

export default {
  Query: {
    getHashtagByName: async (
      _,
      { name },
      { client }: { client: PrismaClient }
    ) => {
      try {
        const hashtag = await client.hashtag.findUnique({
          where: {
            name,
          },
        });
        return {
          ok: true,
          hashtag,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Hashtag not found.",
        };
      }
    },
  },
};
