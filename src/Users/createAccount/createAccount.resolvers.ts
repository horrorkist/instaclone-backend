import bcrypt from "bcrypt";
import client from "../../client.js";

export default {
  Mutation: {
    createAccount: async (parent, args) => {
      const { userName, email, password } = args;
      // check if username or email already exists
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ userName }, { email }],
          },
          select: {
            id: true,
          },
        });
        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }
        // hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // create user
        const user = await client.user.create({
          data: {
            ...args,
          },
        });

        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};
