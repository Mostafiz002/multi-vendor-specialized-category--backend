import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "./category.controller";

const router = Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export const CategoryRouter = router;
