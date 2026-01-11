import { Router } from "express";
import { UserRouter } from "../../modules/user/user.route";
import { CategoryRouter } from "../../modules/specialized-category/category.route";

const router = Router();

router.use("/users", UserRouter);
router.use("/categories", CategoryRouter);

export default router;
