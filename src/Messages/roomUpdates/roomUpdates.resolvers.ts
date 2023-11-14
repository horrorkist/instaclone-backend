import { withFilter } from "graphql-subscriptions";
import { PubSubEvents } from "../../constants.js";
import pubsub from "../../pubsub.js";
import client from "../../client.js";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        const room = await client.room.findFirst({
          where: {
            id: args.roomId,
            users: {
              some: {
                id: context.loggedInUser.id,
              },
            },
          },
          select: {
            id: true,
          },
        });

        if (!room) {
          throw new Error("You tried to subscribe not existing room.");
        }

        return withFilter(
          () => pubsub.asyncIterator(PubSubEvents.newMessage),
          async ({ roomUpdates }, { roomId }, { loggedInUser }) => {
            if (roomUpdates.roomId === roomId) {
              const room = await client.room.findFirst({
                where: {
                  id: roomId,
                  users: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
                select: {
                  id: true,
                },
              });

              if (!room) {
                return false;
              }
              return true;
            }

            return false;
          }
        )(root, args, context, info);
      },
    },
  },
};
