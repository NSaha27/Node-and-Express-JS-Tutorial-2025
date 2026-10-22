import express from "express";
import path from "node:path/posix";
import session from "express-session";
import flash from "connect-flash";

import authentication from "./middlewares/authentication.js";
import errorhandling from "./middlewares/errorhandling.js";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import env from "./config/validation.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// middlewares
app.use(session({
  secret: env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000*60*60
  }
}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve("public")));

app.use(authentication);

// routes
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.use(errorhandling);

const PORT = env.PORT || 8080;
const HOST = env.HOST || "localhost";
app.listen(PORT, HOST, (err) => {
  if(err){
    console.error("Unable to start the server!");
  }else{
    console.log(`Server was started at http://${HOST}:${PORT}`);
  }
});
