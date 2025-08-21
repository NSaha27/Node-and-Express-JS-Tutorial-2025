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
router.get("/my-accomodations", hostController.loadMyAccomodationsPage);
router.get("/edit-accomodation", hostController.loadAddAccomodationPage);
router.post("/edit-accomodation", uploadFields, hostController.editAccomodation);
router.post("/delete-accomodation", hostController.deleteAccomodation);

export default router;