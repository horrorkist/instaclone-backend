import { protectedResolver } from "../../Users/users.utils.js";
import { PubSubEvents } from "../../constants.js";
import pubsub from "../../pubsub.js";
import { Resolver } from "../../types.js";

const resolverFn: Resolver = async (
  _,
  { payload, roomId, receiverId },
  { loggedInUser, client }
) => {
  let message = null;
  try {
    if (receiverId && roomId) {
      return {
        ok: false,
        error: "You can't send a message to a room and a user.",
      };
    } else if (receiverId) {
      const receiver = await client.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
        },
      });

      if (!receiver) {
        return {
          ok: false,
          error: "This user does not exist.",
        };
      }

      const room = await client.room.create({
        data: {
          users: {
            connect: [
              {
                id: receiverId,
              },
              {
                id: loggedInUser.id,
              },
            ],
          },
        },
      });

      message = await client.message.create({
        data: {
          payload,
          room: {
            connect: {
              id: room.id,
            },
          },
          author: {
            connect: {
              id: loggedInUser.id,
            },
          },
        },
      });
    } else if (roomId) {
      const room = await client.room.findUnique({
        where: {
          id: roomId,
        },
        select: {
          id: true,
        },
      });

      if (!room) {
        return {
          ok: false,
          error: "Room not found.",
        };
      }

      message = await client.message.create({
        data: {
          payload,
          room: {
            connect: {
              id: roomId,
            },
          },
          author: {
            connect: {
              id: loggedInUser.id,
            },
          },
        },
      });
    } else {
      return {
        ok: false,
        error: "Room or user must exist.",
      };
    }
    pubsub.publish(PubSubEvents.newMessage, {
      roomUpdates: {
        ...message,
      },
    });
    return {
      ok: true,
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      error: "Could not send message.",
    };
  }
};

export default {
  Mutation: {
    sendMessage: protectedResolver(resolverFn),
  },
};
