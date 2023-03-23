import { Category } from "../types/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categoryApiHelper = async (req: any): Promise<any> => {
  const { id, subCatName } = req.params;
  const lang = req.language;
  const command = prisma.category.findMany;
  let payload;
  if (subCatName) {
    return getCategoryPosts({ id: Number(id), name: subCatName }, lang);
  } else if (id) {
    payload = {
      select: {
        id: true,
        name: true,
        image: true,
      },
      where: {
        parent: Number(id),
      },
    };
  } else {
    payload = {
      select: {
        id: true,
        name: true,
        image: true,
      },
    };
  }
  return getCategories(command, payload);
};

const getCategories = async (
  command: any,
  payload: any
): Promise<Category[]> => {
  //removed
};

const getParentCategories = async () => {
  //removed
};

export { categoryApiHelper, getParentCategories };
