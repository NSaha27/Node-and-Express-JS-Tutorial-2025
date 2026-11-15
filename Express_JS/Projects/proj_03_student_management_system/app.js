import express from "express";

import {connectDB} from "./config/db.js";

const app = express();

app.use();

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";
try{
  await connectDB();
  app.listen(PORT, HOST, (err) => {
    if(err){
      throw new Error("Unable to start the server, error: " + err.message);
    }
    console.log(`Server was started at http://${HOST}:${PORT}`);
  })
}catch(err){
  console.error(err.message);
  process.exit(1);
}