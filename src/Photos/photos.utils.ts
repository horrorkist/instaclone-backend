export function processHashtags(caption: String) {
  return caption.match(/#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g)?.map((hashtag) => ({
    where: { name: hashtag },
    create: { name: hashtag },
  }));
}
