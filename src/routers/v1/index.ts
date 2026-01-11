import { Router } from "express";
import { UserRouter } from "../../modules/user/user.route";

const router = Router();

//user routes
router.use("/users", UserRouter);


export default router;
