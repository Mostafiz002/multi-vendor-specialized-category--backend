import { prisma } from "../../shared/prisma";

interface ICreateCategory {
  name: string;
  description?: string;
}

const createCategory = async (payload: ICreateCategory) => {
  const category = await prisma.category.create({
    data: payload,
  });
  return category;
};

const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
  return categories;
};

const getCategoryById = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

const updateCategory = async (id: string, payload: Partial<ICreateCategory>) => {
  const category = await prisma.category.update({
    where: { id },
    data: payload,
  });
  return category;
};

const deleteCategory = async (id: string) => {
  const category = await prisma.category.update({
    where: { id },
    data: { isActive: false },
  });
  return category;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
