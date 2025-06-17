import express from "express";
import { dispAccomodation } from "../controllers/handleAccomodation.js";

const router = express.Router();

router.get("/", dispAccomodation);

export default router;