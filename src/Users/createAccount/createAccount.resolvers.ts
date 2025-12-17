import bcrypt from "bcrypt";
import client from "../../client.js";

export default {
  Mutation: {
    createAccount: async (parent, args) => {
      const { username, email, password } = args;
      console.log(username, email, password);
      // check if username or email already exists
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
          select: {
            id: true,
          },
        });
        if (existingUser) {
          throw new Error("This username/email is already in use.");
        }
        // hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // create user
        const user = await client.user.create({
          data: {
            ...args,
            password: hashedPassword,
          },
        });

        return {
          ok: true,
        };
      } catch (e) {
        console.error(e);
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};
