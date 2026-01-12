import { Router } from "express";
import { OrderController } from "./order.controller";
import checkAdmin from "../../../middlewares/checkAdmin";

const router = Router();

// Admin-protected routes
router.post("/", checkAdmin(), OrderController.createOrder);
router.get("/", OrderController.getAllOrders);
router.get("/:id", checkAdmin(), OrderController.getSingleOrder);
router.patch("/:id", checkAdmin(), OrderController.updateOrderStatus);
router.delete("/:id", checkAdmin(), OrderController.deleteOrder);

export const OrderRouter = router;
