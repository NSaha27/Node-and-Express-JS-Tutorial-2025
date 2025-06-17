import express from "express";
import { addAccomodation, dispAddAccomodationPage } from "../controllers/handleAccomodation.js";

const router = express.Router();

router.get("/add-accomodation", dispAddAccomodationPage);
router.post("/add-accomodation", addAccomodation);

export default router;