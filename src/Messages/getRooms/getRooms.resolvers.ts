import { protectedResolver } from "../../Users/users.utils.js";
import { Resolver } from "../../types.js";

const resolverFn: Resolver = async (_, __, { loggedInUser, client }) => {
  try {
    const rooms = await client.room.findMany({
      where: {
        users: {
          some: {
            id: loggedInUser.id,
          },
        },
      },
    });
    return {
      ok: true,
      rooms,
    };
  } catch {
    return {
      ok: false,
      error: "Could not load rooms.",
    };
  }
};

export default {
  Query: {
    getRooms: protectedResolver(resolverFn),
  },
};
