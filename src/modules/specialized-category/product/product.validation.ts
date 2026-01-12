import { z } from "zod";

// Schema to create a product
export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  stock: z.number().int().nonnegative("Stock must be 0 or more").optional(),
  categoryId: z.string().uuid("Invalid category ID"),
  isActive: z.boolean().optional(),
});

// Schema to update a product (all fields optional)
export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
  categoryId: z.string().uuid().optional(),
  isActive: z.boolean().optional(),
});
