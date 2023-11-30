import { PrismaClient } from "@prisma/client";
import client from "../../client";

export default {
  Query: {
    getPhotos: async (
      _,
      { username, page },
      { client }: { client: PrismaClient }
    ) => {
      try {
        const photos = await client.photo.findMany({
          where: {
            author: {
              username,
            },
          },
          take: 15,
          skip: (page - 1) * 15,
          orderBy: {
            createdAt: "desc",
          },
        });

        return {
          ok: true,
          photos,
        };
      } catch {
        return {
          ok: false,
          error: "Can't get photos.",
        };
      }
    },
  },
};
