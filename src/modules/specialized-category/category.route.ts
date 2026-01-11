import { Router } from "express";
import { CategoryController } from "./category.controller";
import catchAsync from "../../shared/catchAsync";
import { authorize } from "../../middlewares/authorize";

const router = Router();

// Admin-only routes
router.post("/", authorize(["ADMIN"]), catchAsync(CategoryController.createCategory));
router.patch("/:id", authorize(["ADMIN"]), catchAsync(CategoryController.updateCategory));
router.delete("/:id", authorize(["ADMIN"]), catchAsync(CategoryController.deleteCategory));

// Public routes
router.get("/", catchAsync(CategoryController.getAllCategories));
router.get("/:id", catchAsync(CategoryController.getCategoryById));

export const CategoryRouter = router;
