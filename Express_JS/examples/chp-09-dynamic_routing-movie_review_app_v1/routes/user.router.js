import { Router } from "express";

import {
    handleLogin,
    handleSignup,
    loadLoginPage,
    loadSignupPage,
    loadUserDashboard
} from "../controller/user.controller.js";

const userRouter = Router();

userRouter.get("/login", loadLoginPage);
userRouter.post("/login", handleLogin);
userRouter.get("/signup", loadSignupPage);
userRouter.post("/signup", handleSignup);
userRouter.get("/dashboard", loadUserDashboard);

export default userRouter;