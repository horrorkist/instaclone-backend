import { Resolver } from "./../../types.d";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils.js";
import { Resolvers } from "../../types.js";

const editProfile: Resolver = async function (
  _,
  { firstName, lastName, userName, email, password, bio },
  { loggedInUser, client }
) {
  let newPassword = null;
  if (password) {
    newPassword = await bcrypt.hash(password, 10);
  }
  try {
    await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        firstName,
        lastName,
        userName,
        email,
        bio,
        ...(newPassword && { password: newPassword }),
      },
    });
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

const resolvers: Resolvers = {
  Query: {},

  Mutation: {
    editProfile: protectedResolver(editProfile),
  },
};

export default resolvers;
