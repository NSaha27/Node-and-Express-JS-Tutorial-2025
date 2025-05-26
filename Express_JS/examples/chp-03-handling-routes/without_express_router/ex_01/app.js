// core modules

// external modules
import express from "express";
import dotenv from "dotenv";

// local modules
import routes from "./routes/route.js";

const app = express();

dotenv.config();

// host and port
const host = process.env.HOST;
const port = process.env.NODE_ENV === "development" ? 3000 : 5000;

app.get("/", routes.loadHomePage);
app.get("/about", routes.loadAboutUsPage);
app.get("/blog", routes.loadBlogPage);
app.get("/register", routes.loadRegisterPage);
app.get("/login", routes.loadLoginPage);

app.listen(port, host, err => {
  if(!err){
    console.log(`server is running at http://${host}:${port}`);
  }else{
    console.log("sorry, unable to start the server!");
  }
})