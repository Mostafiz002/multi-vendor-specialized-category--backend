import { Router } from "express";
import { productController } from "./product.controller";

const router = Router();

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getSingleProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export const ProductRouter = router;
