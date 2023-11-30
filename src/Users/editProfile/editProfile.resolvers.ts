import { Resolver } from "./../../types.d";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils.js";
import { Resolvers } from "../../types.js";
import { PrismaClient, User } from "@prisma/client";
import { deleteCloudflareImage, getUploadUrl } from "../../api/api.js";

const editProfile: Resolver = async function (
  _,
  { firstName, lastName, username, email, password, bio, avatar },
  { loggedInUser, client }
) {
  let newPassword = null;
  if (password) {
    newPassword = await bcrypt.hash(password, 10);
  }
  try {
    if (avatar) {
      deleteCloudflareImage(loggedInUser.avatar);
    }
    await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        firstName,
        lastName,
        username,
        email,
        bio,
        avatar,
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
  Query: {
    getUploadUrl: protectedResolver(
      async (_, __, { loggedInUser }: { loggedInUser: User }) => {
        const uploadUrl = await getUploadUrl();

        return uploadUrl;
      }
    ),
  },

  Mutation: {
    editProfile: protectedResolver(editProfile),
  },
};

export default resolvers;
