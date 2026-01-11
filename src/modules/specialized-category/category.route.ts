import { Router } from "express";
import { CategoryController } from "./category.controller";
import catchAsync from "../../shared/catchAsync";
import checkAdmin from "../../middlewares/checkAdmin";

const router = Router();

// Admin-only routes
router.post("/", checkAdmin(), catchAsync(CategoryController.createCategory));
router.patch("/:id", checkAdmin(), catchAsync(CategoryController.updateCategory));
router.delete("/:id", checkAdmin(), catchAsync(CategoryController.deleteCategory));

// Public routes
router.get("/", catchAsync(CategoryController.getAllCategories));
router.get("/:id", catchAsync(CategoryController.getCategoryById));

export const CategoryRouter = router;
