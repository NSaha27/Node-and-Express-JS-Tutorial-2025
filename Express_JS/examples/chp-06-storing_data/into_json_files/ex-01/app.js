import path from "path";

import dotenv from "dotenv";
import express from "express";

import AddAccomodationRouter from "./routes/addAccomodationRouter.js";
import homeRouter from "./routes/homeRouter.js";

const app = express();
dotenv.config();

const HOST = "127.0.0.1";
const PORT = process.env.NODE_ENV === "development" ? 3000 : 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.resolve(process.cwd(), "public")));

app.use(homeRouter);
app.use("/host", AddAccomodationRouter);

app.listen(PORT, HOST, (err) => {
  if (err) {
    console.error("sorry, unable to start the server!");
  } else {
    console.log(`server is running at http://${HOST}:${PORT}`);
  }
});
