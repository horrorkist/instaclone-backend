export default {
  Query: {
    getPhoto: async (_, { id }, { client }) => {
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
      return {
        ok: true,
        photo,
      };
    },
  },
};
