import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub.js";
import { PubSubEvents } from "../../constants.js";

export default {
  Subscription: {
    onRoomCreated: {
      subscribe: async (root, args, context, info) =>
        withFilter(
          () => pubsub.asyncIterator(PubSubEvents.roomCreated),
          async ({ onRoomCreated }, _, { loggedInUser }) => {
            return onRoomCreated.users.some(
              (user) => user.id === loggedInUser.id
            );
          }
        )(root, args, context, info),
    },
  },
};
