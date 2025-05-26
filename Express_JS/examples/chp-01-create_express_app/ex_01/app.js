// core modules

// external modules
import express from "express";
import dotenv from "dotenv";

// local modules

const app = express();

dotenv.config();

const port = process.env.NODE_ENV === "development" ? 3000 : 5000;
const host = process.env.HOST;

// handle different middlewares here...
app.use((req, res, next) => {
  console.log("command is now at the first middleware ", req.url, req.method);
  next();
})
app.use((req, res, next) => {
  console.log("command is now at the second middleware ", req.url, req.method);
  res.end();
})
app.use((req, res, next) => {
  console.log("command is now at the third middleware ", req.url, req.method);
  res.end();
})

app.listen(port, host, err => {
  if(err){
    console.error("sorry, unable to start the server!");
  }else{
    console.log(`server is running at http://${host}:${port}`);
  }
})
