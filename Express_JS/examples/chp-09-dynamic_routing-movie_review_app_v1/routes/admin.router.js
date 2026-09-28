import {Router} from "express";
import {loadHomePage, load404Page} from "../controller/admin.controller.js";

const adminRouter = Router();

adminRouter.get("/", loadHomePage);
adminRouter.get("/404", load404Page);

export default adminRouter;