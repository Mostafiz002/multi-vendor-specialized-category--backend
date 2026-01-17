import { prisma } from "../../shared/prisma";
import { slugify } from "../../helper/slugify";
import { generateUniqueSlug } from "../../helper/generateUniqueSlug";
import { Prisma, ProductStatus } from "../../../../generated/prisma/client";
import { CreateProductPayload } from "../../interfaces/index";

// create product
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
      status: payload.status ?? ProductStatus.DRAFT,

      basePrice: new Prisma.Decimal(payload.basePrice),
      salePrice: payload.salePrice
        ? new Prisma.Decimal(payload.salePrice)
        : undefined,
      costPrice: payload.costPrice
        ? new Prisma.Decimal(payload.costPrice)
        : undefined,

      weight: payload.weight,
      length: payload.length,
      width: payload.width,
      height: payload.height,

      metaTitle: payload.metaTitle,
      metaDescription: payload.metaDescription,
      metaKeywords: payload.metaKeywords,

      isFeatured: payload.isFeatured ?? false,
      isEcoFriendly: payload.isEcoFriendly ?? false,
      isHandmade: payload.isHandmade ?? false,
      isLocal: payload.isLocal ?? false,
      isSustainable: payload.isSustainable ?? false,
      isOrganic: payload.isOrganic ?? false,
      isHalal: payload.isHalal ?? false,
      isSunnahBased: payload.isSunnahBased ?? false,

      categoryId: payload.categoryId,
    },
  });
};

// get all products
const getAllProducts = async () => {
  return prisma.product.findMany({
    where: {
      status: {
        notIn: [ProductStatus.DISCONTINUED, ProductStatus.INACTIVE],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      sku: true,
      name: true,
      slug: true,
      shortDescription: true,
      basePrice: true,
      salePrice: true,
      isFeatured: true,
      isEcoFriendly: true,
      images: {
        select: {
          id: true,
          url: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
};

// GET SINGLE PRODUCT
const getSingleProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: true,
      variants: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
      inventory: true,
      healthWellness: true,
      eventSupply: true,
      repairKit: true,
      islamicDecor: true,
      attributes: true,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// UPDATE PRODUCT
const updateProduct = async (
  id: string,
  payload: Partial<CreateProductPayload>
) => {
  return prisma.product.update({
    where: { id },
    data: {
      ...payload,
      basePrice: payload.basePrice
        ? new Prisma.Decimal(payload.basePrice)
        : undefined,
      salePrice: payload.salePrice
        ? new Prisma.Decimal(payload.salePrice)
        : undefined,
      costPrice: payload.costPrice
        ? new Prisma.Decimal(payload.costPrice)
        : undefined,
    },
  });
};

// deactivate product
const deactivateProduct = async (id: string) => {
  return prisma.product.update({
    where: { id },
    data: {
      status: ProductStatus.INACTIVE,
    },
  });
};

// delete product
const deleteProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
      variants: true,
      inventory: true,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.variants.length > 0) {
    throw new Error("Cannot delete product with active variants");
  }

  return prisma.product.delete({
    where: { id },
  });
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deactivateProduct,
  deleteProduct,
};
