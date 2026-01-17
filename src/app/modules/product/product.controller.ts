import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ProductService } from "./product.service";
import { createProductSchema, updateProductSchema } from "./product.validation";

// create product
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const validatedData = createProductSchema.parse(req.body);

  const result = await ProductService.createProduct(validatedData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

// get all products
const getAllProducts = catchAsync(async (_req: Request, res: Response) => {
  const result = await ProductService.getAllProducts();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

// get single products
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProductService.getSingleProduct(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

// update product
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const validatedData = updateProductSchema.parse(req.body);

  const result = await ProductService.updateProduct(id, validatedData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// deactivate product
const deactivateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProductService.deactivateProduct(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product deactivated successfully",
    data: result,
  });
});

// delete product (hard delete)
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProductService.deleteProduct(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deactivateProduct,
  deleteProduct,
};
