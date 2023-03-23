import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.category.createMany({
      data: [],
    });
  } catch (error) {
    console.log("DB seed error occurred", error);
  }
  await prisma.$disconnect();
};
main();
