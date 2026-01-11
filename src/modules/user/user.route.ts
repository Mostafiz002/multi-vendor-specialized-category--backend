import { Router } from "express";
import { UserController } from "./user.controller";
import { authorize } from "../../middlewares/authorize";
import catchAsync from "../../shared/catchAsync";

const router = Router();

router.post("/", UserController.createUser);
router.get("/", authorize(["ADMIN"]), catchAsync(UserController.getAllUsers));
router.get("/:id", authorize(["ADMIN"]), catchAsync(UserController.getSingleUser));

export const UserRouter = router;
