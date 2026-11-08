import {Router} from "express";
import {loadAdminRegistrationPage,
  handleRegistration,
  loadAdminLoginPage,
  handleLogin,
  loadAdminDashboard } from "../controllers/admin.controller.js";
import {loadProductsPage, loadAddProductPage, handleAddProduct} from "../controllers/product.controller.js";
import authentication from "../middlewares/authentication.js";

const adminRouter = Router();

adminRouter.get("/register", loadAdminRegistrationPage);
adminRouter.post("/register", handleRegistration);
adminRouter.get("/login", loadAdminLoginPage);
adminRouter.post("/login", handleLogin);
adminRouter.get("/dashboard", authentication, loadAdminDashboard);
adminRouter.get("/products", authentication, loadProductsPage);
adminRouter.get("/add-product", authentication, loadAddProductPage);
adminRouter.post("/add-product", handleAddProduct);

export default adminRouter;