// BUILD-IN MODULES
import path from "node:path";

// EXTERNAL MODULES
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

// INTERNAL MODULES
import errorHandler from "./middlewares/errorHandler.js";
import airbnbRouter from "./routes/airbnbRouter.js";
import clientRouter from "./routes/clientRoute.js";
import hostRouter from "./routes/hostRoute.js";


const app = express();

// APPLICATION SETTINGS
dotenv.config();
app.set("view engine", "ejs");
app.set("views", "views");
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.NODE_ENV === "development" ? 3000 : 5000;

app.use(express.static(path.resolve(process.cwd(), "public")));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/host", hostRouter);
app.use("/client", clientRouter);
app.use("/", airbnbRouter);

app.use(errorHandler);

app.listen(PORT, HOST, (err) => {
  if(!err){
    console.log(`server is running at http://${HOST}:${PORT}`);
  }else{
    console.log("*sorry, unable to start the server!");
  }
})