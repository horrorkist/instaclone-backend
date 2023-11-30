export default {
  Comment: {
    author: ({ authorId }, _, { client }) => {
      return client.user.findUnique({
        where: {
          id: authorId,
        },
      });
    },
    photo: ({ photoId }, _, { client }) => {
      return client.photo.findUnique({
        where: {
          id: photoId,
        },
      });
    },
    isMine: ({ authorId }, _, { loggedInUser }) => {
      return authorId === loggedInUser?.id;
    },
  },
};
