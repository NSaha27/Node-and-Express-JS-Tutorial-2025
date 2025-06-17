import express from "express";
import { addAccomodation, hostLogin, hostRegistration, loadAddAccomodationPage, loadHostHomePage, loadHostLoginPage, loadHostRegistrationPage } from "../controllers/hostController.js";

const hostRouter = express.Router();

hostRouter.get("/registration", loadHostRegistrationPage);

hostRouter.post("/registration", hostRegistration);

hostRouter.get("/login", loadHostLoginPage);

hostRouter.post("/login", hostLogin);

hostRouter.get("/home", loadHostHomePage);

hostRouter.get("/add-accomodation", loadAddAccomodationPage);

hostRouter.post("/add-accomodation", addAccomodation)

export default hostRouter;