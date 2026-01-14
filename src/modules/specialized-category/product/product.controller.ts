import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ProductService } from "./product.service";
import { createProductSchema ,updateProductSchema} from "./product.validation";
import sendResponse from "../../../shared/sendResponse";

export const createProduct = catchAsync(async (req, res) => {
  const validatedData = createProductSchema.parse(req.body);

  const result = await ProductService.createProduct(validatedData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

export const getAllProducts = catchAsync(async (_req, res) => {
  const result = await ProductService.getAllProducts();

  res.json({
    success: true,
    data: result,
  });
});

export const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getSingleProduct(req.params.id);

  res.json({
    success: true,
    data: result,
  });
});

export const updateProduct = catchAsync(async (req, res) => {
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

export const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductService.deleteProduct(req.params.id);

  res.json({
    success: true,
    message: "Product deactivated successfully",
    data: result,
  });
});

