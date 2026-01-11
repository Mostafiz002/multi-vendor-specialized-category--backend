import { prisma } from "../../../shared/prisma";

interface CreateProductPayload {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  categoryId: string;
  isActive?: boolean;
}

const createProduct = async (payload: CreateProductPayload) => {
  const product = await prisma.product.create({
    data: {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      stock: payload.stock ?? 0,
      categoryId: payload.categoryId,
      isActive: payload.isActive ?? true,
    },
  });

  return product;
};

const getAllProducts = async () => {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true }, // include category details
  });
};

const getSingleProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) throw new Error("Product not found");

  return product;
};

const updateProduct = async (
  id: string,
  payload: Partial<CreateProductPayload>
) => {
  const product = await prisma.product.update({
    where: { id },
    data: payload,
  });

  return product;
};

const deleteProduct = async (id: string) => {
  const product = await prisma.product.delete({
    where: { id },
  });

  return product;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
