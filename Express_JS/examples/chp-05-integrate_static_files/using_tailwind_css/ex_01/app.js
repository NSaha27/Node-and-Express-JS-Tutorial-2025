// core modules
import path from "path";

// external modules
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

// local modules
import errorHandler from "./middlewares/errorHandler.js";
import hostRouter from "./routes/hostRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();

dotenv.config();

const host = process.env.HOST || "127.0.0.1";
const port = process.env.NODE_ENV === "development" ? 3000 : 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(userRouter);
app.use("/host", hostRouter);

app.use((req, res, next) => {
  res.status(404).render("404", {pageTitle: "404 page not found!", userType: "user"});
})

app.use(errorHandler);

app.listen(port, host, err => {
  if(!err){
    console.log(`server is running at http://${host}:${port}`);    
  }else{
    console.error("sorry, unable to start the server!");
  }
})