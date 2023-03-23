import { FailedTranslation, Translation, Content } from "../types/types";
import { postTranslation } from "../controllers/DeepL.js";
import { failedPostTranslations } from "./Post.js";
import { Request, Response, NextFunction } from "express";

const supportedLangs = [
  "FR",
  "PT",
  "UK",
  "RU",
  "DE",
  "IT",
  "ES",
  "TR",
  "JA",
  "ZH",
];

const settleAndGetValue = async (
  promiseArray: Promise<any>[]
): Promise<any> => {
  const success = [];
  const failed: FailedTranslation[] = [];
  const promises = await Promise.allSettled(promiseArray);
  for (let i = 0; i < promises.length; i++) {
    const promise = promises[i];
    if (promise?.status === "fulfilled") {
      success.push(promise.value);
    } else {
      failed.push({
        langCode: supportedLangs[i],
        reason: promise.reason.message,
      });
    }
  }
  return { success, failed };
};

const getTranslatedPosts = async (
  postId: number,
  { title, content }: Content,
  options: {
    failedPost: string;
  },
  langs = supportedLangs
): Promise<Translation[] | []> => {
  try {
    const translationPromises = [];
    //removed
    const { success, failed } = await settleAndGetValue(translationPromises);
    if (failed.length > 0) {
      failedPostTranslations(postId, failed, options.failedPost);
    }
    return success;
  } catch (error) {
    throw new Error("Error occured in translating posts");
  }
};

function extractLanguage(req: any, res: Response, next: NextFunction) {
  const language = req.query.lang ? req.query.lang.toUpperCase() : "EN";
  req.language = language;
  next();
}

const createTranslationPayload = (postID: number, translations: any[]) => {
  return translations.map((translation: object) => {
    return { ...translation, postID };
  });
};

export {
  settleAndGetValue,
  createTranslationPayload,
  supportedLangs,
  getTranslatedPosts,
  extractLanguage,
};
