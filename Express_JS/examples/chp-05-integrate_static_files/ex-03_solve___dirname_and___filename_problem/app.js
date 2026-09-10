import express from "express";
import path from "node:path/posix";

import { EnvValdSchema } from "./config/validate.js";
import { handleLogin, loadLoginPage } from "./routes/handleLogin.js";
import { handleRegistration, loadRegistrationPage } from "./routes/handleRegistration.js";
import { loadUserHomePage } from "./routes/handleUserHomePage.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(import.meta.dirname, "public")));

app.get("/registration", loadRegistrationPage);
app.post("/registration", handleRegistration);
app.get("/login", loadLoginPage);
app.post("/login", handleLogin);
app.get("/user-home", loadUserHomePage);


const envValdResult = EnvValdSchema.safeParse(process.env);
if(!envValdResult.success){
  console.error("Invalid environment variables!");
}else{
  const PORT = envValdResult.data.PORT;
  const HOST = envValdResult.data.HOST;
  app.listen(PORT, HOST, (err) => {
    if(err){
      console.error("Unable to start the server, error:", err.message);
    }else{
      console.log(`Server was started at http://${HOST}:${PORT}`);
    }
  })
}