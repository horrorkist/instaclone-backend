import { protectedResolver } from "../../Users/users.utils.js";
import { Resolver } from "../../types";

const resolverFn: Resolver = async (
  _,
  { url, caption },
  { loggedInUser, client }
) => {
  let hashtagsObj = [];
  if (caption) {
    const hashtags = caption.match(/#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g);
    hashtagsObj = hashtags?.map((hashtag) => ({
      where: { name: hashtag },
      create: { name: hashtag },
    }));
  }
  try {
    const photo = await client.photo.create({
      data: {
        url,
        caption,
        author: {
          connect: {
            id: loggedInUser.id,
          },
        },
        ...(hashtagsObj.length && {
          hashtags: {
            connectOrCreate: hashtagsObj,
          },
        }),
      },
    });
    return {
      ok: true,
      photo,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "Cannot upload photo.",
    };
  }
};

export default {
  Mutation: {
    uploadPhoto: protectedResolver(resolverFn),
  },
};
