import {Router} from "express";

import {loadIndexPage} from "../controllers/general.controller.js";

const generalRoute = Router();

generalRoute.get("/", loadIndexPage);

export default generalRoute;