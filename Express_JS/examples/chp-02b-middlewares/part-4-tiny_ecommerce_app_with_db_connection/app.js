import express from "express";
import path from "node:path/posix";
import session from "express-session";
import flash from "connect-flash";

import {connectDB} from "./config/db.js";
import errorhandling from "./middlewares/errorhandling.js";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import generalRoute from "./routes/general.route.js";
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

// routes
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/", generalRoute);

app.use(errorhandling);

const PORT = env.PORT || 8080;
const HOST = env.HOST || "localhost";

async function startServer(){
  try{
    await connectDB();
    app.listen(PORT, HOST, (err) => {
      if(err){
        throw err;
      }
      console.log(`Server was started at http://${HOST}:${PORT}`);
    });
  }catch(err){
    console.error("Unable to start the server, error: " + err.message);
    process.exit(1);
  }
}

startServer();
