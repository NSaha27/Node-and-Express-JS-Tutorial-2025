import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Admin from "../models/admin.model.js";

const loadAdminRegistrationPage = async(req, res) => {
  const username = res.locals.authResult?.username || null;
  if (username) {
    return res.redirect("/admin/dashboard");
  }
  const fileName = "register.ejs";
  try{
    const message = req.flash("message");
    res.status(200).render(`admin/${fileName}`, {pageURL: "/admin/register", message: message});
  }catch(err){
    console.error(err);
    res.status(302).redirect("/404");
  }
};

const handleRegistration = async(req, res) => {
  const formData = req.body;
  if(formData.username.length === 0 || formData.name.length === 0 || formData.govnDocType.length === 0 || formData.govnDocID.length === 0 || formData.address.length === 0 || formData.phone.length === 0 || formData.email.length === 0 || formData.password.length === 0 || formData.confirmpassword.length === 0){
    req.flash("message", "All fields are required!");
    return res.status(400).redirect("/admin/register");
  }
  if(formData.password !== formData.confirmpassword){
    req.flash("message", "Both Password and Confirm Password must be same!");
    return res.status(400).redirect("/admin/register");
  }
  try{
    const newAdmin = new Admin(formData.username, formData.name, formData.govnDocType, formData.govnDocID, formData.address, formData.phone, formData.email, formData.password);
    const result = await newAdmin.addAdmin();
    req.flash(
      "message",
      `${result.message} your registration number is " ${result.registrationId} "`,
    );
    res.status(200).redirect("/admin/login");
  }catch(err){
    console.error(err);
    req.flash("message", "Failed! unable to register");
    res.status(500).redirect("/admin/register");
  }
}

const loadAdminLoginPage = async(req, res) => {
  const username = res.locals.authResult?.username || null;
  if (username) {
    req.flash("message", "");
    return res.redirect("/admin/dashboard");
  }
  const fileName = "login.ejs";
  try{
    const message = req.flash("message");
    res.status(200).render(`admin/${fileName}`, {pageURL: "/admin/login", message: message});
  }catch(err){
    console.error(err);
    res.status(404).redirect("/404");
  }
};

const handleLogin = async(req, res) => {
  const formData = req.body;
  if(formData.username.length === 0 || formData.password.length === 0){
    req.flash("message", "All fields are required!");
    return res
      .status(400)
      .redirect("/admin/login");
  }
  try{
    const result = await Admin.findAdmin(formData.username);
    const pswMatched = await bcrypt.compare(formData.password, result.password);
    if(!pswMatched){
      throw new Error("Invalid login credentials!");
    }
    const token = jwt.sign({username: formData.username}, process.env.JWT_SECRET_KEY, {algorithm: "HS256", expiresIn: 60*60});
    req.session.token = token;
    req.flash("message", "Login successful!");
    res.status(200).redirect("/admin/dashboard");
  }catch(err){
    req.flash("message", err.message);
    res.redirect("/admin/login");
  }
}

const loadAdminDashboard = async(req, res) => {
  const username = res.locals.authResult?.username || null;
  if (!username) {
    req.flash("message", res.locals.authResult.message);
    return res.redirect("/admin/login");
  }
  const fileName = "dashboard.ejs";
  try{
    const message = req.flash("message");
    res.status(200).render(`admin/${fileName}`, {pageURL: "/admin/dashboard", username: username, message: message});
  }catch(err){
    console.error(err);
    res.status(302).redirect("/404");
  }
};

export {
  loadAdminRegistrationPage,
  handleRegistration,
  loadAdminLoginPage,
  handleLogin,
  loadAdminDashboard,
};