import { PrismaClient } from "../generated/prisma/client";
import client from "../client.js";

export default {
  Message: {
    author: ({ id }, _) => {
      return client.message.findUnique({ where: { id } }).author();
    },
    room: ({ id }, _) => {
      return client.message.findUnique({ where: { id } }).room();
    },
  },

  Room: {
    users: ({ id }, _) => {
      return client.room.findUnique({ where: { id } }).users();
    },
    messages: ({ id }, _) => {
      return client.message.findMany({
        where: {
          roomId: id,
        },
      });
    },
    lastMessage: ({ id }, _) => {
      return client.message.findFirst({
        where: {
          roomId: id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    unreadMessagesCount: () => 10,
  },
};
