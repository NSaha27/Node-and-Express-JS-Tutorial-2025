import express from "express";
import session from "express-session";
import path from "node:path/posix";

import handleUserDashboard from "./controller/handleUserDashboard.js";
import handleUserLogin from "./controller/handleUserLogin.js";
import handleUserSignup from "./controller/handleUserSignup.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 60*60*1000
    }
  }),
);

const userRouter = express.Router();
const todoRouter = express.Router();
app.use("/user", userRouter);
app.use("/todo", todoRouter);

userRouter.post("/user-signup", handleUserSignup);
userRouter.post("/user-login", handleUserLogin);
userRouter.get("/user-dashboard", handleUserDashboard);
// todoRouter.get("/view-todo", handleViewTodo);
// todoRouter.post("/add-todo", handleAddTodo);
// todoRouter.get("/edit-todo/:id", handleEditTodo);
// todoRouter.post("/delete-todo/:id", handleDeleteTodo);

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, (err) => {
  if(err){
    console.error("Unable to start the server, error: " + err.message);
  }else{
    console.log(`Server was started at http://${HOST}:${PORT}`);
  }
});
