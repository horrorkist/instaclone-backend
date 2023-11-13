import { PrismaClient } from "@prisma/client";

export default {
  Query: {
    getPhotoComments: async (
      _,
      { id, page },
      { client }: { client: PrismaClient }
    ) => {
      try {
        const comments = await client.comment.findMany({
          where: {
            photoId: id,
          },
          take: 10,
          skip: (page - 1) * 10,
        });

        return {
          ok: true,
          comments,
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          error: "Cannot get comments",
        };
      }
    },
  },
};
