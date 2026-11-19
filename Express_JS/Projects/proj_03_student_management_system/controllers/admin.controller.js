import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import env from "../config/validation.js";
import Admin from "../models/admin.model.js";

const loadRegistrationPage = async (req, res) => {
  const adminId = res.locals.authResult?.adminId || null;
  if(adminId){
    return res.redirect("/admin/dashboard");
  }
  const fileName = "registration.ejs";
  try{
    const message = req.flash("message");
    return res.status(200).render(fileName, {pageURL: "/admin/registration", message: message});
  }catch(err){
    console.error(err.message);
    res.redirect("/404");
  }
}

const handleRegistration = async (req, res) => {
  const reqBody = req.body;
  if(reqBody.adminId.length === 0 || reqBody.name.length === 0 || reqBody.phone.length === 0 || reqBody.email.length === 0 || reqBody.password.length === 0){
    req.flash("message", "All fields are required!");
    return res.redirect("/admin/registration");
  }
  try{
    const encryptedPsw = await bcrypt.hash(reqBody.password);
    const newAdmin = new Admin(reqBody.adminId, reqBody.name, reqBody.phone, reqBody.email, encryptedPsw);
    const result = newAdmin.addAdmin();
    req.flash("message", result.message);
    return res.redirect("/admin/login");
  }catch(err){
    req.flash("message", err.message);
    res.redirect("/admin/registration");
  }
};

const loadLoginPage = async (req, res) => {
  const adminId = res.locals.authResult?.adminId || null;
  if(adminId){
    return res.redirect("/admin/dashboard");
  }
  const fileName = "login.ejs";
  try{
    const message = req.flash("message");
    return res.status(200).render(fileName, {pageURL: "/admin/login", message: message});
  }catch(err){
    console.error(err.message);
    res.redirect("/404");
  }
};

const handleLogin = async (req, res) => {
  const {adminId, password} = req.body;
  if(adminId.length === 0 || password.length === 0){
    req.flash("message", "All fields are required!");
    return res.redirect("/admin/login");
  }
  try{
    const response = await Admin.findAdmin(adminId);
    if(Object.keys(response).includes("message")){
      req.flash("message", response.message);
      return res.redirect("/admin/login");
    }
    const isPswMatched = await bcrypt.compare(password, response.password);
    if(!isPswMatched){
      throw new Error("Invalid login credentials!");
    }
    const token = jwt.sign(adminId, env.JWT_SECRET_KEY, {algorithm: "HS256"});
    req.session.token = token;
    res.redirect("/admin/dashboard");
  }catch(err){
    req.flash("message", err.message);
    res.redirect("/admin/login");
  }
};

const loadAdminDashboard = async (req, res) => {
  const adminId = res.locals.authResult?.adminId || null;
  if(!adminId){
    req.flash("message", "Please login at first!");
    return res.redirect("/admin/login");
  }
  const fileName = "dashboard.ejs";
  try{
    const message = req.flash("message");
    res.render(fileName, {pageURL: "/admin/dashboard", message: message});
  }catch(err){
    console.error(err.message);
    res.redirect("/404");
  }
}

