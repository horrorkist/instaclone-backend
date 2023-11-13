import { protectedResolver } from "../../Users/users.utils.js";
import { Resolver } from "../../types.js";

const resolverFn: Resolver = async (
  _,
  { photoId },
  { loggedInUser, client }
) => {
  const photo = await client.photo.findUnique({
    where: {
      id: photoId,
    },
  });

  if (!photo) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  }

  const like = await client.like.findUnique({
    where: {
      photoId_authorId: {
        photoId,
        authorId: loggedInUser.id,
      },
    },
  });

  if (like) {
    await client.like.delete({
      where: {
        id: like.id,
      },
    });
  } else {
    await client.like.create({
      data: {
        photo: {
          connect: {
            id: photoId,
          },
        },
        author: {
          connect: {
            id: loggedInUser.id,
          },
        },
      },
    });
  }

  return {
    ok: true,
  };
};

export default {
  Mutation: {
    toggleLike: protectedResolver(resolverFn),
  },
};
