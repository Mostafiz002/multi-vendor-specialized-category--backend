import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { CategoryService } from "./category.service";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation";

export const createCategory = catchAsync(async (req: Request, res: Response) => {
  const validatedData = createCategorySchema.parse(req.body);

  const result = await CategoryService.createCategory(validatedData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

export const getAllCategories = catchAsync(async (_req, res) => {
  const result = await CategoryService.getAllCategories();

  res.json({
    success: true,
    data: result,
  });
});

export const getSingleCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.getSingleCategory(req.params.id);

  res.json({
    success: true,
    data: result,
  });
});

export const updateCategory = catchAsync(async (req, res) => {
  const validatedData = updateCategorySchema.parse(req.body);

  const result = await CategoryService.updateCategory(
    req.params.id,
    validatedData
  );

  res.json({
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

export const deleteCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.deleteCategory(req.params.id);

  res.json({
    success: true,
    message: "Category deactivated successfully",
    data: result,
  });
});
