import bcrypt from "bcrypt";
import fs from "node:fs/promises";
import path from "node:path/posix";

import { LoginFormValdSchema } from "../config/validate.js";

const loadLoginPage = async(req, res) => {
  const fileName = "login.html";
  const filePath = path.join(import.meta.dirname, "views", fileName);

  try{
    const pageContent = await fs.readFile(filePath, "utf8");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    return res.send(pageContent);
  }catch(err){
    console.error(err.message);
    res.statusCode = 302;
    res.setHeader("Location", "/404");
    return res.send();
  }
};

const handleLogin = async(req, res) => {
  const result = LoginFormValdSchema.safeParse(req.body);
  if(!result.success){
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    return res.send(JSON.stringify({error: `Invalid login data, error(s): ${result.error.issues.join(", ")}`, status: false}));
  }
  let users;
  const fileName = "user.json";
  try{
    const data = await fs.readFile(`/data/${fileName}`, "utf8");
    users = data.length > 0 ? JSON.parse(data) : [];
  }catch(err){
    console.error(err.message);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.send(JSON.stringify({error: `Unable to read the file, error: ${err.message}`}));
  }
  const userFound = users.find(user => user.username === result.data.username);
  if(!userFound){
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    return res.send(
      JSON.stringify({
        error: `Invalid login credentials!`,
        status: false,
      }),
    );
  }
  const isValidPassword = await bcrypt.compare(result.data.password, userFound.password);
  if(!isValidPassword){
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    return res.send(
      JSON.stringify({
        error: `Invalid login credentials!`,
        status: false,
      }),
    );
  }
  res.statusCode = 302;
  res.setHeader("Location", "/user-home");
  return res.send();
}

export { handleLogin, loadLoginPage };
