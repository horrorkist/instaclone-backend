import { Resolver } from "../../types";
import { protectedResolver } from "../users.utils.js";

const resolverFn: Resolver = async (
  _,
  { username },
  { loggedInUser, client }
) => {
  if (username === loggedInUser.username) {
    return {
      ok: false,
      error: "You can't follow yourself.",
    };
  }
  const ok = await client.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  if (!ok) {
    return {
      ok: false,
      error: "That user does not exist.",
    };
  }
  await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      following: {
        connect: {
          username,
        },
      },
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    followUser: protectedResolver(resolverFn),
  },
};
