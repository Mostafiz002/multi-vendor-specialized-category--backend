import { Router } from "express";
import { OrderController } from "./order.controller";
import checkAdmin from "../../../middlewares/checkAdmin";

const router = Router();

// Admin-protected routes
router.post("/", OrderController.createOrder);
router.get("/", OrderController.getAllOrders);
router.get("/:id", OrderController.getSingleOrder);
router.patch("/:id", OrderController.updateOrderStatus);
router.delete("/:id", OrderController.deleteOrder);

export const OrderRouter = router;
