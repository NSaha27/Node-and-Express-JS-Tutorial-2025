import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {pageTitle: "Home page", userType: "user"});
});

router.get("/blog", (req, res) => {
  res.render("blog", {pageTitle: "Blog page", userType: "user"})
});

router.get("/register", (req, res) => {
  res.render("register", {pageTitle: "Registration page", userType: "user"})
});

router.post("/register", (req, res) => {
  const reqBody = req.body;
  if(reqBody){
    console.log(reqBody);
    res.setHeader("status", "registration successful!");
    res.redirect(302, "/login");
  }else{
    res.setHeader("status", "all fields are required!");
    res.redirect(302, "/register");
  }
});

router.get("/login", (req, res) => {
  const status = req.headers["status"] ? req.headers["status"] : "";
  res.render("login", {pageTitle: "log In", userType: "user", status: status})
});

router.post("/login", (req, res) => {
  const reqBody = req.body;
  if(reqBody){
    if(reqBody.username === "NILADRISAHA" && reqBody.password === "NiladriSaha@12345"){
      res.setHeader("status", "log in successful!");
      res.cookie("username", reqBody.username, {maxAge: 60*60*1000, httpOnly: true});
      res.redirect(302, "/user-home");
    }else{
      res.setHeader("status", "invalid log in credentials!");
      res.redirect(302, "/login");
    }
  }else{
    res.setHeader("status", "all fields are required!");
    res,redirect(302, "/login");
  }
});

router.get("/user-home", (req, res) => {
  const status = req.headers["status"] ? req.headers["status"] : "";
  const username = req.cookies["username"] ? req.cookies["username"] : "";
  if(username){
    res.render("user-home", {pageTitle: "User home page", userType: "user", username: username, status: status});
  }else{
    res.setHeader("status", "please login at first!");
    res.redirect(302, "/login");
  }
})


export default router;

