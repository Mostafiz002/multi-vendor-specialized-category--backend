import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { CategoryService } from "./category.service";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const validatedData = createCategorySchema.parse(req.body);

  const result = await CategoryService.createCategory(validatedData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategories = catchAsync(async (_req, res) => {
  const result = await CategoryService.getAllCategories();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Categories retrieved successfully",
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.getSingleCategory(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category retrieved successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const validatedData = updateCategorySchema.parse(req.body);

  const result = await CategoryService.updateCategory(
    req.params.id,
    validatedData
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

const deactivateCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.deactivateCategory(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category deactivated successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.deleteCategory(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category deleted successfully",
    data: result,
  });
});

export const categoryController = {
  createCategory,
  getAllCategories,
  deactivateCategory,
  updateCategory,
  getSingleCategory,
  deleteCategory,
};
