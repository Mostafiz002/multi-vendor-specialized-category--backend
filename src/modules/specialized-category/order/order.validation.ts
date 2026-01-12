import { z } from "zod";

// Schema for each order item
const orderItemSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  quantity: z.number().int().positive("Quantity must be greater than 0"),
  price: z.number().positive("Price must be greater than 0"),
});

// Schema to create an order
export const createOrderSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  items: z.array(orderItemSchema).min(1, "Order must contain at least one item"),
  totalAmount: z.number().positive("Total amount must be greater than 0"),
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"]).optional(),
});

// Schema to update order status
export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"], "Invalid status"),
});
