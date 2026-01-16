import { prisma } from "../../shared/prisma";
import { slugify } from "../../helper/slugify";
import { generateUniqueSlug } from "../../helper/generateUniqueSlug";

interface CreateCategoryPayload {
  name: string;
  description?: string;
  parentId?: string;
  storeType?: string;
  metaTitle?: string;
  metaDescription?: string;
  image?: string;
}

const createCategory = async (payload: CreateCategoryPayload) => {
  const baseSlug = slugify(payload.name);
  const slug = await generateUniqueSlug(baseSlug, prisma.category);

  return prisma.category.create({
    data: {
      name: payload.name,
      slug,
      description: payload.description,
      parentId: payload.parentId,
      storeType: payload.storeType,
      metaTitle: payload.metaTitle,
      metaDescription: payload.metaDescription,
      image: payload.image,
    },
  });
};

const getAllCategories = async () => {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: {
      children: false,
    },
  });
};

const getSingleCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      children: true,
      parent: true,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

const updateCategory = async (
  id: string,
  payload: Partial<CreateCategoryPayload>
) => {
  return prisma.category.update({
    where: { id },
    data: payload,
  });
};

const deleteCategory = async (id: string) => {
  return prisma.category.update({
    where: { id },
    data: { isActive: false },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
