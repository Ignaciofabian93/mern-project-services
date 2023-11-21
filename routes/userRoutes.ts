import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userControllers";

const userRouter = Router();

userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(registerUser);

export default userRouter;
