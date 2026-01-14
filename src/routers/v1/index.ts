import { Router } from "express";
import { UserRouter } from "../../modules/user/user.route";
import { CategoryRouter } from "../../modules/specialized-category/category.route";
import { ProductRouter } from "../../modules/specialized-category/product/product.route";
import { OrderRouter } from "../../modules/specialized-category/order/order.route";

const router = Router();

router.use("/users", UserRouter);
router.use("/specialized-category", CategoryRouter);
router.use("/products", ProductRouter);
router.use("/orders", OrderRouter);

export default router;
