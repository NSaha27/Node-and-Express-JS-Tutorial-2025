import {Router} from "express";
import {loadAdminRegistrationPage,
  handleRegistration,
  loadAdminLoginPage,
  handleLogin,
  loadAdminDashboard} from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.get("/register", loadAdminRegistrationPage);
adminRouter.post("/register", handleRegistration);
adminRouter.get("/login", loadAdminLoginPage);
adminRouter.post("/login", handleLogin);
adminRouter.get("/dashboard", loadAdminDashboard);

export default adminRouter;