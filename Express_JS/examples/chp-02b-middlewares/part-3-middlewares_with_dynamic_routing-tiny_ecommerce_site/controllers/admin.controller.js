import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Admin from "../models/admin.model.js";
import Product from "../models/product.model.js";
import env from "../config/validation.js";

const loadAdminRegistrationPage = async(req, res) => {
  const adminID = res.locals.authResult?.ID || null;
  if (adminID) {
    return res.redirect("/admin/dashboard");
  }
  const fileName = "register.ejs";
  try{
    const messages = req.flash("message");
    res.status(200).render(`admin/${fileName}`, {pageURL: "/admin/register", messages: messages});
  }catch(err){
    console.error(err);
    res.status(302).redirect("/404");
  }
};

const handleRegistration = async(req, res) => {
  const formData = req.body;
  if(formData.id.length === 0 || formData.name.length === 0 || formData.govnDocType.length === 0 || formData.govnDocID.length === 0 || formData.address.length === 0 || formData.phone.length === 0 || formData.email.length === 0 || formData.password.length === 0 || formData.confirmpassword.length === 0){
    req.session.flash("message", "All fields are required!");
    return res.status(400).redirect("/admin/register");
  }
  if(formData.password !== formData.confirmpassword){
    req.session.flash("message", "Both Password and Confirm Password must be same!");
    return res.status(400).redirect("/admin/register");
  }
  try{
    const newAdmin = new Admin(formData.id, formData.name, formData.govnDocType, formData.govnDocID, formData.address, formData.phone, formData.email, formData.password);
    const result = await newAdmin.addAdmin();
    req.session.flash("message", result.message);
    res.status(200).redirect("/admin/login");
  }catch(err){
    console.error(err);
    req.session.flash("message", "Failed! unable to register");
    res.status(500).redirect("/admin/register");
  }
}

const loadAdminLoginPage = async(req, res) => {
  const adminID = res.locals.authResult?.ID || null;
  if (adminID) {
    req.session.flash("message", "");
    return res.redirect("/admin/dashboard");
  }
  const fileName = "login.ejs";
  try{
    const messages = req.flash("message");
    res.status(200).render(`admin/${fileName}`, {pageURL: "/admin/login", messages: messages});
  }catch(err){
    console.error(err);
    res.status(404).redirect("/404");
  }
};

const handleLogin = async(req, res) => {
  const formData = req.body;
  if(formData.id.length === 0 || formData.password.length === 0){
    req.session.flash("message", "All fields are required!");
    return res
      .status(400)
      .redirect("/admin/login");
  }
  try{
    const result = await Admin.findAdmin(formData.id);
    const pswMatched = await bcrypt.compare(formData.password, result.password);
    if(!pswMatched){
      throw new Error("Invalid login credentials!");
    }
    const token = jwt.sign(formData.id, env.JWT_SECRET_KEY, {algorithm: "HS256"});
    req.session.token = token;
    req.session.flash("message", "Login successful!");
    res.status(200).redirect("/admin/dashboard");
  }catch(err){
    req.session.flash("message", err.message);
    res.redirect("/admin/login");
  }
}

const loadAdminDashboard = async(req, res) => {
  const adminID = res.locals.authResult?.ID || null;
  if (adminID) {
    req.session.flash("message", res.locals.authResult.message);
    return res.redirect("/admin/dashboard");
  }
  const fileName = "dashboard.ejs";
  try{
    const messages = req.flash("message");
    res.status(200).render(`admin/${fileName}`, {pageURL: "/admin/dashboard", adminID: adminID, messages: messages});
  }catch(err){
    console.error(err);
    res.status(302).redirect("/404");
  }
};

const loadProductsPage = async(req, res) => {
  const adminID = res.locals.authResult?.ID || null;
  if (!adminID) {
    req.session.flash("message", "Please log in at first!");
    return res.redirect("/admin/login");
  }
  const fileName = "display-all-products.ejs";
  try{
    const messages = req.flash("message");
    const products = await Product.fetchAllProducts();
    return res
      .status(200)
      .render(`product/${fileName}`, {
        pageURL: "/admin/all-products",
        messages: messages,
        products: products,
      });
  }catch(err){
    console.error(err);
    res.status(302).redirect("/404");
  }
};

const loadAddProductPage = async(req, res) => {
  const adminID = res.locals.authResult?.ID || null;
  if(!adminID){
    req.session.flash("message", "Please log in at first!");
    return res.redirect("/admin/login");
  }
  const fileName = "add-product.ejs";
  try{
    const messages = req.flash("message");
    res.status(200).render(`product/${fileName}`, {pageURL: "/admin/add-product", messages: messages});
  }catch(err){
    console.error(err);
    res.status(302).redirect("/404");
  }
};

const handleAddProduct = async(req, res) => {
  const reqBody = req.body;
  if(reqBody.id.length === 0 || reqBody.name.length === 0 || reqBody.category.length === 0 || reqBody.description.length === 0 || reqBody.price.length === 0 || reqBody.image.length === 0){
    req.session.flash("message", "All fields are required!");
    return res.status(400).redirect("/admin/add-product");
  }
  try{
    const newProduct = new Product(reqBody.id, reqBody.name, reqBody.category, reqBody.description, reqBody.price, reqBody.image);
    const result = await newProduct.addProduct();
    req.session.flash("message", result.message);
    return res.status(200).redirect("/admin/add-product");
  }catch(err){
    console.error(err);
    req.session.flash("message", "Failed! unable to add the new product, error: " + err.message);
    res.status(500).redirect("/admin/add-product");
  }
};



export {
  loadAdminRegistrationPage,
  handleRegistration,
  loadAdminLoginPage,
  handleLogin,
  loadAdminDashboard,
};