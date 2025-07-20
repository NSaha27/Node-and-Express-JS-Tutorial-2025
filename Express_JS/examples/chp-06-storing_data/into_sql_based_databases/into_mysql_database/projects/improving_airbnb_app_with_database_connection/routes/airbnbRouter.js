import express from "express";

import airbnbController from "../controllers/airbnbController.js";

const router = express.Router();

router.get("/", airbnbController.loadHomePage);

export default router;