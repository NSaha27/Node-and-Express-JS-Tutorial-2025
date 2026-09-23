import { Router } from "express";

// user modules
import { handleLogin, loadLoginPage } from "../controller/handleLogin.js";
import handleLogout from "../controller/handleLogout.js";
import {
    handleRegistration,
    loadRegistrationPage,
} from "../controller/handleRegistration.js";
import loadUserHomePage from "../controller/handleUserHome.js";

const userRouter = Router();

userRouter.get("/registration", loadRegistrationPage);
userRouter.post("/registration", handleRegistration);
userRouter.get("/login", loadLoginPage);
userRouter.post("/login", handleLogin);
userRouter.get("/user-home", loadUserHomePage);
userRouter.get("/logout", handleLogout);

export default userRouter;