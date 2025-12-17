import { protectedResolver } from "../../Users/users.utils.js";
import { Resolver } from "../../types";

const resolverFn: Resolver = async (_, { page }, { client, loggedInUser }) => {
  try {
    const photos = await client.photo.findMany({
      skip: (page - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: "desc",
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
