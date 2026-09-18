import fs from "node:fs/promises";
import path from "node:path/posix";

import bcrypt from "bcrypt";

import User from "../model/user.js";

async function loadLoginPage(req, res) {
  const sessionUser = req.session.username || "";
  if(sessionUser.length > 0){
    return res.status(302).redirect("/user/user-home");
  }
  const fileName = "login.html";
  const filePath = path.resolve("views", "user", fileName);
  try {
    const pageContent = await fs.readFile(filePath, "utf8");
    res.status(200).send(pageContent);
  } catch (err) {
    console.error(
      "Unable to load the login page, error: " + err.message,
    );
    res.status(404).redirect("/404");
  }
}

async function handleLogin(req, res){
  const reqBody = req.body;
  if(reqBody && Object.keys(reqBody).length > 0){
    if(reqBody.username.length === 0 || reqBody.password.length === 0){
      return res.status(400).setHeader("message", "All fields are required!").redirect("/user/login");
    }
    try{
      const user = await User.findAUser(reqBody.username);
      const isPswMatched = await bcrypt.compare(reqBody.password, user.password);
      if(!isPswMatched){
        throw new Error("Invalid login credentials!");
      }
      req.session.username = reqBody.username;
      return res.status(200).setHeader("message", "Login successful!").redirect("/user/user-home");
    }catch(err){
      res.status(500).setHeader("message", err.message).redirect("/user/login");
    }
  }else{
    res.status(400).setHeader("message", "Invalid login credentials!").redirect("/user/login");
  }
}

export { handleLogin, loadLoginPage };
