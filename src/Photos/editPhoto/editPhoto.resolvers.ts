import { protectedResolver } from "../../Users/users.utils.js";
import { Resolver } from "../../types.js";
import { processHashtags } from "../photos.utils.js";

const resolverFn: Resolver = async (
  _,
  { id, caption },
  { loggedInUser, client }
) => {
  const oldPhoto = await client.photo.findFirst({
    where: {
      id,
      authorId: loggedInUser.id,
    },
    include: {
      hashtags: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!oldPhoto) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  }
  if (oldPhoto.authorId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not authorized.",
    };
  }
  await client.photo.update({
    where: {
      id,
    },
    data: {
      caption,
      hashtags: {
        disconnect: oldPhoto.hashtags,
        connectOrCreate: processHashtags(caption),
      },
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    editPhoto: protectedResolver(resolverFn),
  },
};
