import express from "express";

import hostController from "../controllers/hostController.js";
import uploadFields from "../middlewares/fileUploadMiddleware.js";

const router = express.Router();

router.get("/signup", hostController.loadHostSignupPage);
router.post("/signup", hostController.hostSignup);
router.get("/login", hostController.loadHostLoginPage);
router.post("/login", hostController.hostLogin);
router.get("/home", hostController.loadHostHomePage);
router.get("/logout", hostController.hostLogout);
router.get("/add-accomodation", hostController.loadAddAccomodationPage);
router.post("/add-accomodation", uploadFields, hostController.addAccomodation);

export default router;