import { protectedResolver } from "../../Users/users.utils.js";
import { Resolver } from "../../types.js";

const resolverFn: Resolver = async (_, { id }, { loggedInUser, client }) => {
  try {
    const room = await client.room.findFirst({
      where: {
        id,
        users: {
          some: {
            id: loggedInUser.id,
          },
        },
      },
    });
    if (!room) {
      return {
        ok: false,
        error: "Room not found.",
      };
    }
    return {
      ok: true,
      room,
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      error: "Could not get room.",
    };
  }
};

export default {
  Query: {
    getRoom: protectedResolver(resolverFn),
  },
};
