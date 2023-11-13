import { PrismaClient } from "@prisma/client";

export default {
  Query: {
    getPhotoLikes: async (
      _,
      { photoId },
      { client }: { client: PrismaClient }
    ) => {
      const likes = await client.like.findMany({
        where: {
          photoId,
        },
        select: {
          author: true,
        },
      });
      return likes.map((like) => like.author);
    },
  },
};
