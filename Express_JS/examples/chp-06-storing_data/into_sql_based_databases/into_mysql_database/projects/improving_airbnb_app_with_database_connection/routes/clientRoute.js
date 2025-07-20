import express from "express";

import clientController from "../controllers/clientController.js";

const router = express.Router();

router.get("/signup", clientController.loadClientSignupPage);
router.post("/signup", clientController.clientSignup);
router.get("/login", clientController.loadClientLoginPage);
router.post("/login", clientController.clientLogin);
router.get("/home", clientController.loadClientHomePage);
router.get("/logout", clientController.clientLogout);

export default router;