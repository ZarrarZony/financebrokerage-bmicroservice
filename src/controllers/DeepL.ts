import * as deepl from "deepl-node";
import * as dotenv from "dotenv";
import { Content, Translation } from "../types/types";

dotenv.config();
const authKey = "";
const translator = new deepl.Translator(authKey);

const postTranslation = async (
  { title, content }: Content,
  targetLang: any,
  postId: number
): Promise<Translation> => {
  //code removed
  //code removed
  //code removed
  //code removed
  //code removed
  //code removed
  return {
    postTitle: titleTranslation.text,
    postContent: contentTranslation.text,
    langCode: targetLang,
    postId,
  };
};

export { postTranslation };
