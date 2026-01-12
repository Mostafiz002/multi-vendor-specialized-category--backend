import { Router } from "express";
import { ProductController } from "./product.controller";
import checkAdmin from "../../../middlewares/checkAdmin";

const router = Router();

// Admin-only routes
router.post("/", checkAdmin(), ProductController.createProduct);
router.patch("/:id", checkAdmin(), ProductController.updateProduct);
router.delete("/:id", checkAdmin(), ProductController.deleteProduct);

// Public routes
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getSingleProduct);

export const ProductRouter = router;
