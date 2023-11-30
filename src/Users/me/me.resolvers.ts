import { Resolver } from "../../types.js";
import { protectedResolver } from "../users.utils.js";

const resolverFn: Resolver = async (_, __, { loggedInUser }) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "You have to login.",
    };
  }

  return {
    ok: true,
    me: loggedInUser,
  };
};

export default {
  Query: {
    me: protectedResolver(resolverFn),
  },
};
