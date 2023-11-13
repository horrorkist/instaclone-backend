export default {
  Query: {
    getPhoto: async (_, { id }, { client }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
      });
      return photo;
    },
  },
};
