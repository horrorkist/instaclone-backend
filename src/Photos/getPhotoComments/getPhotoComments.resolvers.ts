import { PrismaClient } from "../../generated/prisma/client";

export default {
  Query: {
    getPhotoComments: async (
      _,
      { id, skip },
      { client }: { client: PrismaClient }
    ) => {
      try {
        const comments = await client.comment.findMany({
          where: {
            photoId: id,
          },
          take: 10,
          skip,
          orderBy: {
            createdAt: "desc",
          },
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
