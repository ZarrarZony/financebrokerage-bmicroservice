import { PrismaClient, Prisma, Post } from "@prisma/client";
import { FailedTranslation } from "../types/types";

const prisma = new PrismaClient();
const getPosts = async (command: any, payload: any) => {
  const posts = await command(payload);
  return posts;
};

const getLastPostDate = async () => {
  const date = await prisma.post.findFirst({
    select: {
      createdAt: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  return date;
};

const createPost = async (data: Prisma.PostUncheckedCreateInput) => {
  const { id } = await prisma.post.create({
    data,
    select: {
      id: true,
    },
  });
  return id;
};

const createTranslation = async (data: any) => {
  await prisma.translation.createMany({
    data,
  });
};

const failedPostTranslations = async (
  postId: number,
  failed: FailedTranslation[],
  action: string | null
) => {
  if (action === "create") {
    await prisma.failedSynced.create({
      data: {
        postId,
        langReason: failed,
      },
    });
  } else if (action === "update") {
    await prisma.failedSynced.update({
      data: {
        langReason: failed,
      },
      where: {
        id: postId,
      },
    });
  }
};
const getFailedPosts = async () => {
  const posts = await prisma.failedSynced.findMany({
    select: {
      translations: {
        select: {
          postContent: true,
          postTitle: true,
        },
        where: {
          langCode: "EN",
        },
      },
      langReason: true,
      postId: true,
    },
  });
  return posts;
};

export {
  getLastPostDate,
  createPost,
  createTranslation,
  failedPostTranslations,
  getFailedPosts,
  postApiHelper,
};
