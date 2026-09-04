import express from "express";
import path from "node:path/posix";

import { envValdSchema } from "./config/validate.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve("public")));

const envValdResult = envValdSchema.safeParse(process.env);
if(!envValdResult.success){
  console.error("Invalid environment variable(s)!");
}else{
  const PORT = envValdResult.data.PORT;
  const HOST = envValdResult.data.HOST;
  app.listen(PORT, HOST, (err) => {
    if(err){
      console.error("Unable to start the server, error:", err.message);
    }else{
      console.log(`Server started at http://${HOST}:${PORT}`);
    }
  })
}
