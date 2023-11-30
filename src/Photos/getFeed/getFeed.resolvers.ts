import { Prisma } from "@prisma/client";
import { protectedResolver } from "../../Users/users.utils.js";
import { Resolver } from "../../types";

const resolverFn: Resolver = async (_, { page }, { client, loggedInUser }) => {
  try {
    const photos = await client.photo.findMany({
      // where: {
      //   OR: [
      //     {
      //       author: {
      //         followers: {
      //           some: {
      //             id: loggedInUser.id,
      //           },
      //         },
      //       },
      //     },
      //     {
      //       authorId: loggedInUser.id,
      //     },
      //   ],
      // },
      skip: (page - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
    });

    return {
      ok: true,
      photos,
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      error: "Couldn't get feed",
    };
  }
};

export default {
  Query: {
    getFeed: protectedResolver(resolverFn),
  },
};
