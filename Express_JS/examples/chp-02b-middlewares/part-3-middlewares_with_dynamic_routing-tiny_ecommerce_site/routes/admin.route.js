import {Router} from "express";

const adminRouter = Router();

adminRouter.get("/register", loadAdminRegistrationPage);
adminRouter.post("/register", handleAdminRegistration);
adminRouter.get("/login", loadAdminLoginPage);
adminRouter.post("/login", handleAdminLogin);
adminRouter.get("/dashboard", loadAdminDashboard);

export default adminRouter;