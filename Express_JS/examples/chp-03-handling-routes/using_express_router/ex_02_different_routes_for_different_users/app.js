// core modules
import path from "path";

// external modules
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// local modules
import userRouter from "./routes/userRouter.js";
import hostRouter from "./routes/hostRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

dotenv.config();

const host = process.env.HOST || "127.0.0.1";
const port = process.env.NODE_ENV === "development" ? 3000 : 5000;

app.use(express.static(path.resolve(process.cwd(), "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(userRouter);
app.use("/host", hostRouter);

app.use((req, res, next) => {
  res.status(404).send("<h1>404 page not found!</h1>");
})

app.use(errorHandler);

app.listen(port, host, err => {
  if(!err){
    console.log(`server is running at http://${host}:${port}`);    
  }else{
    console.error("sorry, unable to start the server!");
  }
})