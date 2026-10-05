import {Router} from "express";

const userRouter = Router();

userRouter.get("/register", loadUserRegistrationPage);
userRouter.post("/register", handleUserRegistration);
userRouter.get("/login", loadUserLoginPage);
userRouter.post("/login", handleUserLogin);
userRouter.get("/dashboard", loadUserDashboardPage);


export default userRouter;