// core modules

// external modules
import express from "express";
import dotenv from "dotenv";

// local modules

const app = express();

dotenv.config();

const port = process.env.NODE_ENV === "development" ? 3000 : 5000;

app.use((req, res, next) => {
  console.log("welcome to first middleware!");
  next();
});
app.use((req, res, next) => {
  console.log("welcome to second middleware!");
  res.send("<h1>Hello and welcome to Express JS tutorial!</h1>");
})

app.listen(port, process.env.HOST, err => {
  if(!err){
    console.log(`server is running at http://${process.env.HOST}:${port}`);
  }else{
    console.log("sorry, unable to start the server!");
  }
})