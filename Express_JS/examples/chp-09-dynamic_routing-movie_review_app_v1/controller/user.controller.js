import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "node:fs/promises";
import path from "node:path/posix";

import User from "../model/user.model.js";

const loadSignupPage = async(req, res) => {
  const fileName = "signup.html";
  const filePath = path.resolve("view", "user", fileName);
  try{
    const fileContent = await fs.readFile(filePath, "utf8");
    return res.status(200).send(fileContent);
  }catch(err){
    console.error(err.message);
    return res.status(404).redirect("/404");
  }
};

const handleSignup = async(req, res) => {
  const signupData = req.body;
  if (
    signupData.id.length === 0 ||
    signupData.name.length === 0 ||
    signupData.phone.length === 0 ||
    signupData.email.length === 0 ||
    signupData.password.length === 0 || 
    signupData.confirmpassword.length === 0
  ){
    return res.status(400).json({error: "All fields are required!"});
  }
  if (signupData.password !== signupData.confirmpassword){
    return res.status(400).json({error: "Password and Confirm password must be same!"});
  }
  try{
    const newUser = new User(
      signupData.id,
      signupData.name,
      signupData.phone,
      signupData.email,
      signupData.password
    );
    const result = await newUser.addUser();
    return res.status(200).json(result);
  }catch(err){
    return res.status(500).json({error: err.message});
  }
};

const loadLoginPage = async(req, res) => {
  const fileName = "login.html";
  const filePath = path.resolve("view", "user", fileName);
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    return res.status(200).send(fileContent);
  } catch (err) {
    console.error(err.message);
    return res.status(404).redirect("/404");
  }
};

const handleLogin = async(req, res) => {
  const loginData = req.body;
  if (
    loginData.id.length === 0 ||
    loginData.password.length === 0
  ) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  let userFound;
  try {
    userFound = await User.findUser(loginData.id);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  const isPswMatched = await bcrypt.compare(loginData.password, userFound.password);
  if(!isPswMatched){
    return res.status(400).json({error: "Invalid login credentials!"});
  }
  jwt.sign({id: loginData.id}, process.env.JWT_SECRET_KEY, {algorithm: "HS256", expiresIn: 60*60}, (err, token) => {
    if(err){
      return res.status(500).json({error: err.message});
    }
    req.session.jwt_token = token;
    return res.status(302).redirect("/dashboard");
  });
};

const loadUserDashboard = (req, res) => {
  const token = req.session.jwt_token || "";
  jwt.verify(token, process.env.JWT_SECRET_KEY, {algorithms: ["HS256"]}, async(err, payload) => {
    if(err){
      console.error(err.message);
      return res.status(401).redirect("/login");
    }
    const fileName = "dashboard.html";
    const filePath = path.resolve("view", "user", fileName);
    try{
      const fileContent = await fs.readFile(filePath, "utf8");
      const updatedContent = fileContent.toString().replace("{{ID}}", payload.id);
      return res.status(200).send(updatedContent);
    }catch(er){
      console.error(err.message);
      return res.status(404).redirect("/404");
    }
  })
};

export {
    handleLogin,
    handleSignup,
    loadLoginPage,
    loadSignupPage,
    loadUserDashboard
};
