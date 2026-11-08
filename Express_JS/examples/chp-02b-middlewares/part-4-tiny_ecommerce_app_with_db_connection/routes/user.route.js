import {Router} from "express";

import {loadUserRegistrationPage,
  handleRegistration,
  loadUserLoginPage,
  handleLogin,
  loadUserDashboardPage} from "../controllers/user.controller.js";

import authentication from "../middlewares/authentication.js";

const userRouter = Router();

userRouter.get("/register", loadUserRegistrationPage);
userRouter.post("/register", handleRegistration);
userRouter.get("/login", loadUserLoginPage);
userRouter.post("/login", handleLogin);
userRouter.get("/dashboard", authentication, loadUserDashboardPage);


export default userRouter;