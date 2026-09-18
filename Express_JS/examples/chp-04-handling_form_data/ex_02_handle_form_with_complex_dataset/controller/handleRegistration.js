import fs from "node:fs/promises";
import path from "node:path/posix";

import bcrypt from "bcrypt";

import User from "../model/user.js";

async function loadRegistrationPage(req, res){
  const sessionUser = req.session.username || "";
  if (sessionUser.length > 0) {
    return res.status(302).redirect("/user/user-home");
  }
  const fileName = "register.html";
  const filePath = path.resolve("views", "user", fileName);
  try{
    const pageContent = await fs.readFile(filePath, "utf8");
    res.status(200).send(pageContent);
  }catch(err){
    console.error("Unable to load the registration page, error: " + err.message);
    res.status(404).redirect("/404");
  }
}

async function handleRegistration(req, res){
  const regData = req.body;
  if(regData && Object.keys(regData).length > 0){
    const {user} = regData;
    if(user.username.length === 0 || user.name.length === 0 || user.gender.length === 0 || user.address.length === 0 || user.phone.length === 0 || user.email.length === 0 || user.password.length === 0 || user.confirmpassword.length === 0){
      return res
        .status(400)
        .setHeader("message", "All fields are required!").redirect("/user/registration");
    }
    if(user.password !== user.confirmpassword){
      return res
        .status(400)
        .setHeader("message", "Password and Confirm Password didn't match!").redirect("/user/registration");
    }
    try{
      const saltRound = 10;
      const encryptedPsw = await bcrypt.hash(user.password, saltRound);
      const newUser = new User(
        user.username,
        user.name,
        user.gender,
        user.address,
        user.phone,
        user.email,
        encryptedPsw
      );
      const result = await newUser.addUser();
      return res.status(200).setHeader("message", result).redirect("/user/login");
    }catch(err){
      return res.status(500).setHeader("message", err.message).redirect("/user/registration");
    }
  }else{
    res.status(400).setHeader("message", "Invalid registration data!").redirect("/user/registration");
  }
}

export { handleRegistration, loadRegistrationPage };
