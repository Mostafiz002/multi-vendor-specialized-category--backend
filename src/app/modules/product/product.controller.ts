import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ProductService } from "./product.service";
import { createProductSchema, updateProductSchema } from "./product.validation";
import sendResponse from "../../shared/sendResponse";

const createProduct = catchAsync(async (req, res) => {
  const validatedData = createProductSchema.parse(req.body);

  const result = await ProductService.createProduct(validatedData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (_req, res) => {
  const result = await ProductService.getAllProducts();

  res.json({
    success: true,
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getSingleProduct(req.params.id);

  res.json({
    success: true,
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const validatedData = updateProductSchema.parse(req.body);

  const result = await ProductService.updateProduct(
    req.params.id,
    validatedData
  );

  res.json({
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductService.deleteProduct(req.params.id);

  res.json({
    success: true,
    message: "Product deactivated successfully",
    data: result,
  });
});

export const productController = {
  deleteProduct,
  updateProduct,
  getSingleProduct,
  getAllProducts,
  createProduct,
};
