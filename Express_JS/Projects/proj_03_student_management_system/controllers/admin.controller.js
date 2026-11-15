import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import env from "../config/validation.js";
import Admin from "../models/admin.model.js";
import Student from "../models/student.model.js";
import Course from "../models/course.model.js";
import Batch from "../models/batch.model.js";

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
      req.flash("message", "Invalid login credentials!");
      return res.redirect("/admin/login");
    }
    const token = jwt.sign(adminId, env.JWT_SECRET_KEY, {algorithm: "HS256"});
    req.session.token = token;
    res.redirect("/admin/dashboard");
  }catch(err){
    // write error code
  }
}