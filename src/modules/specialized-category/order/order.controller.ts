import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";
import { createOrderSchema, updateOrderStatusSchema } from "./order.validation";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const validatedData = createOrderSchema.parse(req.body);
  const result = await OrderService.createOrder(validatedData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async (_req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Orders retrieved successfully",
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.getSingleOrder(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order retrieved successfully",
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = updateOrderStatusSchema.parse(req.body);
  const result = await OrderService.updateOrderStatus(id, status);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order status updated successfully",
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.deleteOrder(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order deleted successfully",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
};
