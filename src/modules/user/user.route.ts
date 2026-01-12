import { Router } from "express";
import { UserController } from "./user.controller";
import checkAdmin from "../../middlewares/checkAdmin";
import catchAsync from "../../shared/catchAsync";

const router = Router();

router.post("/", UserController.createUser);
router.get("/",  catchAsync(UserController.getAllUsers));
router.get("/:id", checkAdmin(), catchAsync(UserController.getSingleUser));

export const UserRouter = router;
