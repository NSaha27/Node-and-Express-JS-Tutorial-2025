// build-in modules
import path from "node:path/posix";

// external modules
import express from "express";
import session from "express-session";

import handleNotFound from "./controller/handleNotFound.js";
import userRouter from "./routes/user.router.js";

// express application instance
const app = express();

// middlewares
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 60 * 60 * 1000
  }
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve("public")));

// routes
app.use("/user", userRouter);
app.use(handleNotFound);

// server-connection
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";
app.listen(PORT, HOST, (err) => {
  if(err){
    console.error("Unable to start the server, error: " + err.message);
  }else{
    console.log(`Server was started at http://${HOST}:${PORT}`);
  }
})