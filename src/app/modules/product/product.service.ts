import { prisma } from "../../shared/prisma";
import { slugify } from "../../helper/slugify";
import { generateUniqueSlug } from "../../helper/generateUniqueSlug";

interface CreateProductPayload {
  sku: string;
  name: string;
  description?: string;
  shortDescription?: string;

  productType: "PHYSICAL" | "DIGITAL" | "SERVICE";
  status?: "DRAFT" | "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK" | "DISCONTINUED";

  basePrice: number;
  salePrice?: number;
  costPrice?: number;

  isFeatured?: boolean;
  isEcoFriendly?: boolean;
  isHandmade?: boolean;
  isLocal?: boolean;
  isSustainable?: boolean;

  categoryId: string;
}

const createProduct = async (payload: CreateProductPayload) => {
  const baseSlug = slugify(payload.name);
  const slug = await generateUniqueSlug(baseSlug, prisma.product);

  return prisma.product.create({
    data: {
      sku: payload.sku,
      name: payload.name,
      slug,
      description: payload.description,
      shortDescription: payload.shortDescription,
      productType: payload.productType,
      status: payload.status ?? "DRAFT",

      basePrice: payload.basePrice,
      salePrice: payload.salePrice,
      costPrice: payload.costPrice,

      isFeatured: payload.isFeatured ?? false,
      isEcoFriendly: payload.isEcoFriendly ?? false,
      isHandmade: payload.isHandmade ?? false,
      isLocal: payload.isLocal ?? false,
      isSustainable: payload.isSustainable ?? false,

      categoryId: payload.categoryId,
    },
    include: {
      category: true,
    },
  });
};

const getAllProducts = async () => {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: false,
      images: false,
    },
  });
};

const getSingleProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: true,
      variants: true,
      inventory: true,
    },
  });

  if (!product) throw new Error("Product not found");
  return product;
};

const updateProduct = async (
  id: string,
  payload: Partial<CreateProductPayload>
) => {
  return prisma.product.update({
    where: { id },
    data: payload,
  });
};

const deleteProduct = async (id: string) => {
  return prisma.product.update({
    where: { id },
    data: { status: "INACTIVE" },
  });
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
