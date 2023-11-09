import client from "../client.js";

export default {
  Query: {
    movies: async () => await client.movie.findMany(),
    movie: async (_, { id }) =>
      await client.movie.findUnique({
        where: {
          id,
        },
      }),
  },
};
