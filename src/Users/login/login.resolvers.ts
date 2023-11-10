import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (parent, { userName, password }, { client }) => {
      try {
        // find user with userName
        const user = await client.user.findUnique({
          where: {
            userName,
          },
        });
        if (!user) {
          throw new Error("User not found.");
        }
        // check password
        const passwordOk = bcrypt.compareSync(password, user.password);
        if (!passwordOk) {
          throw new Error("Incorrect password.");
        }
        // issue token
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        return {
          ok: true,
          token,
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

export default resolvers;
