import { protectedResolver } from "../../Users/users.utils.js";
import { Resolver } from "../../types.js";

const resolverFn: Resolver = async (_, { id }, { loggedInUser, client }) => {
  const photo = await client.photo.findUnique({
    where: {
      id,
    },
  });

  if (!photo) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  }

  if (photo.authorId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not authorized.",
    };
  }

  await client.photo.delete({
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
    deletePhoto: protectedResolver(resolverFn),
  },
};
