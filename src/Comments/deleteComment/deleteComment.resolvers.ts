import { protectedResolver } from "../../Users/users.utils.js";
import { Resolver } from "../../types.js";

const resolverFn: Resolver = async (_, { id }, { loggedInUser, client }) => {
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
  }

  if (comment.authorId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not authorized.",
    };
  }

  await client.comment.delete({
    where: {
      id,
    },
  });

  return {
    ok: true,
  };
};

export default {
  Mutation: {
    deleteComment: protectedResolver(resolverFn),
  },
};
