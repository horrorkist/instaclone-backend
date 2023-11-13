import { PrismaClient } from "@prisma/client";

export default {
  Photo: {
    author: ({ authorId }, _, { client }) => {
      return client.user.findUnique({
        where: {
          id: authorId,
        },
      });
    },
    hashtags: ({ id }, _, { client }) => {
      return client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      });
    },
    likesCount: ({ id }, _, { client }) =>
      client.like.count({
        where: {
          photoId: id,
        },
      }),
    commentsCount: ({ id }, _, { client }) => {
      return client.comment.count({
        where: {
          photoId: id,
        },
      });
    },
    isMine: ({ authorId }, _, { loggedInUser }) => {
      return authorId === loggedInUser?.id;
    },
  },

  Hashtag: {
    photos: ({ id }, { page }, { client }: { client: PrismaClient }) => {
      return client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .photos({
          take: 5,
          skip: (page - 1) * 5,
        });
    },
    totalPhotosCount: ({ id }, _, { client }: { client: PrismaClient }) => {
      return client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
};
