import express from "express";
import path from "node:path/posix";

import session from "express-session";

import adminRouter from "./routes/admin.router.js";
import userRouter from "./routes/user.router.js";

const app = express();

// middlewares
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60*60*1000
  }
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve("public")));

app.use("/user", userRouter);
app.use(adminRouter);

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, (err) => {
  if(err){
    console.error(`Error while starting server, error: ${err.message}`);
  }else{
    console.log(`server was started at http://${HOST}:${PORT}`);
  }
})