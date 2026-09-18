// build-in modules
import path from "node:path/posix";

// external modules
import express from "express";
import session from "express-session";

// user modules
import { handleLogin, loadLoginPage } from "./controller/handleLogin.js";
import handleLogout from "./controller/handleLogout.js";
import { handleRegistration, loadRegistrationPage } from "./controller/handleRegistration.js";
import loadUserHomePage from "./controller/handleUserHome.js";

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
const userRouter = express.Router();
app.use("/user", userRouter);

userRouter.get("/registration", loadRegistrationPage);
userRouter.post("/registration", handleRegistration);
userRouter.get("/login", loadLoginPage);
userRouter.post("/login", handleLogin);
userRouter.get("/user-home", loadUserHomePage);
userRouter.get("/logout", handleLogout);

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