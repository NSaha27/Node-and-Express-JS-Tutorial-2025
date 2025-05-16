// external modules
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import path from "path";

// internal modules

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "public")));
app.use(session({
  httpOnly: true,
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {httpOnly: true, secure: false}
}));

app.use(csrf({cookie: true}));

app.set("view engine", "ejs");

app.use();

mongoose.connect(process.env.DB_CONNECTION_STRING, {dbName: "Soccer_Club_DB"})
  .then(() => {
    console.log("database connection established!");
    app.listen(process.env.PORT, process.env.HOST, (error) => {
      if(!error){
        console.log(`server is running at http://${process.env.HOST}:${process.env.PORT}`);
      }else{
        console.error(`failed to start the server, error: ${error.message}`);
      }
    })
  })
  .catch(err => {
    console.log(`database connection failed! error: ${err.message}`);
  })