import express from "express";

const hostRouter = express.Router();

hostRouter.get("/register", (req, res, next) => {
  res.render("register", {pageTitle: "Host Registration", userType: "host"});
})

hostRouter.post("/register", (req, res, next) => {
  const reqBody = req.body;
  if(reqBody){
    console.log(reqBody);
    res.setHeader("status", "registration successful!");
    res.redirect(302, "/host/login");
  }else{
    res.setHeader("status", "all fields are required!");
    res.redirect(302, "/host/register");
  }
})

hostRouter.get("/login", (req, res, next) => {
  res.render("login", {pageTitle: "Host Login", userType: "host"});
})

hostRouter.post("/login", (req, res, next) => {
  const reqBody = req.body;
  if(reqBody){
    if(reqBody.username === "NILADRISAHA" && reqBody.password === "NiladriSaha@12345"){
      res.setHeader("status", "log in successful!");
      res.cookie("username", reqBody.username, {maxAge: 60*60*1000, httpOnly: true});
      res.redirect(302, "/host/home");
    }else{
      res.setHeader("status", "invalid log in credentials!");
      res.redirect(302, "/host/login");
    }
  }else{
    res.setHeader("status", "all fields are required!");
    res.redirect(302, "/host/login");
  }
})

hostRouter.get("/home", (req, res, next) => {
  const status = req.headers["status"] ? req.headers["status"] : "";
  const username = req.cookies["username"] ? req.cookies["username"] : "";
  if(username){
    res.render("host/host-home", {pageTitle: "Host home page", userType: "host", username: username, status: status});
  }else{
    res.setHeader("status", "please log in at first!");
    res.redirect(302, "/host/login");
  }
})

hostRouter.get("/add-accomodation", (req, res, next) => {
  const username = req.cookies["username"] ? req.cookies["username"] : "";
  res.render("host/add-accomodation", {pageTitle: "Add Accomodation", userType: "host", username: username});
})

hostRouter.post("/add-accomodation", (req, res, next) => {
  const reqBody = req.body;
  if(reqBody){
    console.log(reqBody);
    res.setHeader("status", "your accomodation details were saved successfully!");
    res.redirect(302, "/host/add-accomodation");
  }else{
    res.setHeader("status", "all fields are required!");
    res.redirect(302, "/host/add-accomodation");
  }
})

export default router;