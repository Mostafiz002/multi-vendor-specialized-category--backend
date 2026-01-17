import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  description: z.string().optional(),
  storeType: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  image: z.string().url().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export const categoryIdParamSchema = z.object({
  id: z.string().cuid("Invalid category ID"),
});
