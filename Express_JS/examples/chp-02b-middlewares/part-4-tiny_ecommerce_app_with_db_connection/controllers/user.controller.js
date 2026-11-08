import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import env from "../config/validation.js";

import User from "../models/user.model.js";

const loadUserRegistrationPage = async (req, res) => {
  const username = res.locals.authResult?.username || null;
  if (username) {
    req.flash("message", res.locals.authResult.message);
    return res.redirect("/user/dashboard");
  }
  const fileName = "register.ejs";
  try {
    const message = req.flash("message");
    res.status(200).render(`user/${fileName}`, { pageURL: "/user/register", message: message });
  } catch (err) {
    console.error(err);
    res.status(404).redirect("/404");
  }
};

const handleRegistration = async (req, res) => {
  const formData = req.body;
  if (
    formData.username.length === 0 ||
    formData.name.length === 0 ||
    formData.gender.length === 0 ||
    formData.address.length === 0 ||
    formData.phone.length === 0 ||
    formData.email.length === 0 ||
    formData.password.length === 0 ||
    formData.confirmpassword.length === 0
  ) {
    req.flash("message", "All fields are required!");
    return res
      .status(400)
      .redirect("/user/register");
  }
  if (formData.password !== formData.confirmpassword) {
    req.flash("message", "Confirm password must be same as Password!");
    return res
      .status(400)
      .redirect("/user/register");
  }
  try {
    const newUser = new User(
      formData.username,
      formData.name,
      formData.gender,
      formData.address,
      formData.phone,
      formData.email,
      formData.password,
    );
    const result = await newUser.addUser();
    req.flash("message", `${result.message} your registration number is "${result.registrationId}"`);
    res
      .status(200)
      .redirect("/user/login");
  } catch (err) {
    console.error(err);
    req.flash("message", "Failed! unable to register");
    res
      .status(500)
      .redirect("/user/register");
  }
};

const loadUserLoginPage = async (req, res) => {
  const username = res.locals.authResult?.username || null;
  if (username) {
    req.flash("message", res.locals.authResult.message);
    return res.redirect("/user/dashboard");
  }
  const fileName = "login.ejs";
  try {
    const message = req.flash("message");
    res.status(200).render(`user/${fileName}`, { pageURL: "/user/login", message: message });
  } catch (err) {
    console.error(err);
    res.status(404).redirect("/404");
  }
};

const handleLogin = async (req, res) => {
  const formData = req.body;
  if (formData.username.length === 0 || formData.password.length === 0) {
    req.flash("message", "All fields are required!");
    return res.status(400).redirect("/user/login");
  }
  try {
    const result = await User.findUser(formData.username);
    const pswMatched = await bcrypt.compare(formData.password, result.password);
    if (!pswMatched) {
      throw new Error("Invalid login credentials!");
    }
    const token = jwt.sign({username: formData.username}, env.JWT_SECRET_KEY, {
      algorithm: "HS256", expiresIn: 60*60
    });
    req.session.token = token;
    req.flash("message", "Login successful!");
    res.status(200).redirect("/user/dashboard");
  } catch (err) {
    req.flash("message", err.message);
    res.redirect("/user/login");
  }
};

const loadUserDashboardPage = async (req, res) => {
  const username = res.locals.authResult?.username || null;
  if (!username) {
    req.flash("message", "Please login at first!");
    return res.status(401).redirect("/user/login");
  }
  const fileName = "dashboard.ejs";
  try {
    const message = req.flash("message");
    res
      .status(200)
      .render(`user/${fileName}`, {
        pageURL: "/user/dashboard",
        username: username,
        message: message
      });
  } catch (err) {
    console.error(err);
    res.status(404).redirect("/404");
  }
};

export {
  loadUserRegistrationPage,
  handleRegistration,
  loadUserLoginPage,
  handleLogin,
  loadUserDashboardPage,
};