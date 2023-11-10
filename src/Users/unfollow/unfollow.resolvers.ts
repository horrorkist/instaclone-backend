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
      error: "You can't unfollow yourself.",
    };
  }

  const target = await client.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      followers: {
        where: {
          username: loggedInUser.username,
        },
      },
    },
  });

  if (!target) {
    return {
      ok: false,
      error: "That user does not exist.",
    };
  }

  if (!target.followers.length) {
    return {
      ok: false,
      error: "You are not following this user.",
    };
  }

  await client.user.update({
    where: { id: loggedInUser.id },
    data: { following: { disconnect: { username } } },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    unfollowUser: protectedResolver(resolverFn),
  },
};
