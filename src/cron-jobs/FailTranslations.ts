import { getFailedPosts, createTranslation } from "../controllers/Post.js";
import { Translation } from "../types/types.js";
import { getTranslatedPosts } from "../controllers/Helper.js";

const retryFailedTranslations = async () => {
  const posts = await getFailedPosts();
  if (posts.length < 1) return;
  for (const post of posts) {
    const { postId, translations, langReason } = post;
    if (translations.length < 1) continue;
    if (langReason.length < 1) continue;
    const langs: any = langReason.map((langReason: any) => {
      return langReason?.langCode;
    });
    const { postTitle: title, postContent: content } = translations[0];
    const postTranslations: Translation[] = await getTranslatedPosts(
      postId,
      {
        title,
        content,
      },
      {
        failedPost: "update",
      },
      langs
    );
    createTranslation(postTranslations);
  }
};

export { retryFailedTranslations };
