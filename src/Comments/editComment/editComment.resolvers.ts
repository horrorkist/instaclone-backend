import { protectedResolver } from "../../Users/users.utils.js";
import { Resolver } from "../../types.js";

const resolverFn: Resolver = async (
  _,
  { id, payload },
  { loggedInUser, client }
) => {
  const comment = await client.comment.findUnique({
    where: {
      id,
    },
    select: {
      authorId: true,
    },
  });
  if (!comment) {
    return {
      ok: false,
      error: "Comment not found.",
    };
  } else if (comment.authorId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not authorized.",
    };
  } else {
    await client.comment.update({
      where: {
        id,
      },
      data: {
        payload,
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    editComment: protectedResolver(resolverFn),
  },
};
