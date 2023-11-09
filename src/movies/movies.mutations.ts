import client from "../client.js";

export default {
  Mutation: {
    addMovie: async (_, { title, year, genre = "" }) =>
      await client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),
    deleteMovie: async (_, { id }) =>
      await client.movie.delete({
        where: {
          id,
        },
      }),

    updateMovie: async (_, { id, title, year, genre }) => {
      const {
        title: oldTitle,
        year: oldYear,
        genre: oldGenre,
      } = await client.movie.findUnique({
        where: {
          id,
        },
      });
      return await client.movie.update({
        where: {
          id,
        },
        data: {
          title: title || oldTitle,
          year: year || oldYear,
          genre: genre || oldGenre,
        },
      });
    },
  },
};
