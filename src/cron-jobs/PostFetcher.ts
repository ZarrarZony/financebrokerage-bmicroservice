import wpapi from "wpapi";
import _ from "lodash";
import * as fs from "fs";
import { WpPost, Translation } from "../types/types.js";
import { getTranslatedPosts } from "../controllers/Helper.js";
import {
  getLastPostDate,
  createPost,
  createTranslation,
} from "../controllers/Post.js";
import { getParentCategories } from "../controllers/Category.js";

const wp = new wpapi({ endpoint: "http://financebrokerage.com/wp-json" });
const getPostsFromWP = async (
  category: number,
  from: Date | undefined
): Promise<WpPost[] | []> => {
  const posts = from
    ? wp.posts().categories(category).after(`${from}Z`)
    : wp.posts().categories(category).perPage(1);
  return posts;
};

const startFetcher = async () => {
  try {
    const [categories, lastPost] = await Promise.all([
      getParentCategories(),
      getLastPostDate(),
    ]);
    if (categories.length === 0) throw new Error("categories not found");
    const date: Date | undefined = lastPost?.createdAt;
    for (const { wpCatId, id: catId } of categories) {
      if (!wpCatId) continue;
      const wpPosts = await getPostsFromWP(wpCatId, date);
      if (wpPosts.length < 1) continue;
      for (const wpPost of wpPosts) {
        // code removed
        // code removed
        // code removed
        // code removed
        // code removed
        // code removed
        // code removed
        // code removed
        // code removed
        translations.push({
          postTitle: title,
          postContent: content,
          langCode: "EN",
          postId,
        });
        createTranslation(translations);
      }
      return "One category Done";
    }
  } catch (error) {
    console.log("Start Fetcher : ", error);
  }
};

export { startFetcher };
