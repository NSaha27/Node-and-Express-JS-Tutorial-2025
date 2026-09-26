import {Router} from "express";

const userRouter = Router();

userRouter.get("/login", loadLoginPage);
userRouter.post("/login", handleLogin);
userRouter.get("/signup", loadSignupPage);
userRouter.post("/signup", handleSignup);

export default userRouter;