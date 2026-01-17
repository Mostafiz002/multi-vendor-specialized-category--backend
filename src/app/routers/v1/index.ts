import { Router } from "express";
import { UserRouter } from "../../modules/user/user.routes";
import { CategoryRouter } from "../../modules/category/category.routes";
import { ProductRouter } from "../../modules/product/product.routes";
import { OrderRouter } from "../../modules/order/order.routes";

const router = Router();

router.use("/users", UserRouter);
router.use("/categories", CategoryRouter);
router.use("/products", ProductRouter);
router.use("/orders", OrderRouter);

export default router;
