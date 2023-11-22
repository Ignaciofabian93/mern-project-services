import { Router } from "express";
import {
  loginUser,
  registerUser,
  getUserData,
} from "../controllers/userControllers";
import { protect } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(registerUser);
userRouter.route("/user").get(protect, getUserData);

export default userRouter;
