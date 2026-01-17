import { z } from "zod";

//// PRISMA ENUMS (SYNCED)
export const productTypeEnum = z.enum([
  "PHYSICAL",
  "HEALTH_WELLNESS",
  "EVENT_SUPPLY",
  "REPAIR_KIT",
  "DECOR",
]);

export const productStatusEnum = z.enum([
  "DRAFT",
  "ACTIVE",
  "INACTIVE",
  "OUT_OF_STOCK",
  "DISCONTINUED",
]);

//// COMMON FIELDS
const priceSchema = z.number().positive();
const optionalPriceSchema = z.number().positive().optional();

const dimensionSchema = z.number().positive().optional();

//// CREATE PRODUCT
export const createProductSchema = z.object({
  // Basic info
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Product name is required"),

  description: z.string().optional(),
  shortDescription: z.string().optional(),

  // Type & status
  productType: productTypeEnum,
  status: productStatusEnum.optional(),

  // Pricing
  basePrice: priceSchema,
  salePrice: optionalPriceSchema,
  costPrice: optionalPriceSchema,

  // Shipping / dimensions
  weight: dimensionSchema,
  length: dimensionSchema,
  width: dimensionSchema,
  height: dimensionSchema,

  // SEO
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),

  // Flags
  isFeatured: z.boolean().optional(),
  isEcoFriendly: z.boolean().optional(),
  isHandmade: z.boolean().optional(),
  isLocal: z.boolean().optional(),
  isSustainable: z.boolean().optional(),
  isHalal: z.boolean().optional(),
  isSunnahBased: z.boolean().optional(),

  // Relations
  categoryId: z.string().cuid("Invalid category ID"),
});

//// UPDATE PRODUCT
export const updateProductSchema = createProductSchema.partial();


//// PARAM VALIDATION
export const productIdParamSchema = z.object({
  id: z.string().cuid("Invalid product ID"),
});
