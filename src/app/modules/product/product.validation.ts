import { z } from "zod";

/**
 * ENUMS (must match Prisma enums)
 */
export const productTypeEnum = z.enum(["PHYSICAL", "DIGITAL", "SERVICE"]);
export const productStatusEnum = z.enum([
  "DRAFT",
  "ACTIVE",
  "INACTIVE",
  "OUT_OF_STOCK",
  "DISCONTINUED",
]);

/**
 * CREATE PRODUCT
 */
export const createProductSchema = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),

  description: z.string().optional(),
  shortDescription: z.string().optional(),

  productType: z.enum(["PHYSICAL", "DIGITAL", "SERVICE"]),
  status: z
    .enum(["DRAFT", "ACTIVE", "INACTIVE", "OUT_OF_STOCK", "DISCONTINUED"])
    .optional(),

  basePrice: z.number().positive(),
  salePrice: z.number().optional(),
  costPrice: z.number().optional(),

  isFeatured: z.boolean().optional(),
  isEcoFriendly: z.boolean().optional(),
  isHandmade: z.boolean().optional(),
  isLocal: z.boolean().optional(),
  isSustainable: z.boolean().optional(),

   categoryId: z.string(),
});

/**
 * UPDATE PRODUCT
 */
export const updateProductSchema = createProductSchema.partial();


/**
 * PARAM VALIDATION
 */
export const productIdParamSchema = z.object({
  id: z.string().cuid("Invalid product ID"),
});
