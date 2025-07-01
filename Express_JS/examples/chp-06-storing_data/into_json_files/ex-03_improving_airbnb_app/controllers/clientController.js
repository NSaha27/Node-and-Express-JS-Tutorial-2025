import bcrypt from "bcrypt";

import Client from "../models/clientModel.js";

// module scaffolding
const clientController = {};

clientController.loadClientSignupPage = (req, res, next) => {
  const message = req.headers["message"] ? req.headers["message"] : "";
  const username = req.cookies["username"] ? req.cookies["username"] : "";
  const isLoggedIn = username.length > 0 ? true : false;
  try{
    if(!isLoggedIn){
      return res.status(200).render("common/registration", {pageTitle: "Client sign up", userType: "client", message: message});
    }else{
      return res.status(302).redirect(`/home?username=${encodeURIComponent(username)}&message=${encodeURIComponent("***you're already logged in!")}`);
    }
  }catch(err){
    next(err.message);
  }
};

clientController.clientSignup = async (req, res, next) => {
  const {username, name, address, phone, email, password, confirmPassword} = req.body;
  if(password !== confirmPassword){
    return res.status(302).redirect(`/signup?message=${encodeURIComponent("***password and confirm password must be same!")}`);
  }
  const encryptedPsw = await bcrypt.hash(password, 10);
  try{
    const newClient = new Client(username, name, address, phone, email, encryptedPsw);
    await newClient.save();
    return res.status(302).redirect(`/login?message=${encodeURIComponent("***registration successful, please log in now!")}`);
  }catch(err){
    next(err.message);
  }
};

clientController.loadClientLoginPage = (req, res, next) => {
  const message = req.headers["message"] ? req.headers["message"] : "";
  const username = req.cookies["username"] ? req.cookies["username"] : "";
  const isLoggedIn = username.length > 0 ? true : false;
  try{
    if(!isLoggedIn){
      return res.status(200).render("common/login", {pageTitle: "Client log in", userType: "client", message: message});
    }else{
      return res.status(302).redirect(`/home?username=${encodeURIComponent(username)}&message=${encodeURIComponent("***you're already logged in!")}`)
    }
  }catch(err){
    next(err.message);
  }
};

clientController.clientLogin = async (req, res, next) => {
  const {username, password} = req.body;
  try{
    const getResult = await Client.findClientByUsername(username);
    if(typeof getResult === "string"){
      return res.status(302).redirect(`/login?message=${encodeURIComponent(getResult)}`)
    }else{
      const isPswMatched = await bcrypt.compare(password, getResult.password);
      if(isPswMatched){
        res.cookie("username", username, {maxAge: 60*60*1000, httpOnly: true, sameSite: "strict"});
        res.cookie("userType", "client", {maxAge: 60*60*1000, httpOnly: true, sameSite: "strict"});
        return res.status(302).redirect(`/home?message=${encodeURIComponent("***log in successful!")}`);
      }else{
        return res.status(302).redirect(`/login?message=${encodeURIComponent("***log in failed, invalid credentials!")}`);
      }
    }
  }catch(err){
    next(err.message);
  }
};

clientController.loadClientHomePage = (req, res, next) => {
  const message = req.headers["message"] ? req.headers["message"] : "";
  const username = req.cookies["username"] ? req.cookies["username"] : "";
  const isLoggedIn = username.length > 0 ? true : false;
  try{
    if(!isLoggedIn){
      return res.status(302).redirect(`/login?message=${"***please log in at first!"}`);
    }else{
      return res.status(200).render("client/home", {pageTitle: "Client home page", userType: "client", username: username, message: message});
    }
  }catch(err){
    next(err.message);
  }
};

clientController.clientLogout = (req, res, next) => {
  const username = req.cookies["username"] ? req.cookies["username"] : "";
  const userType = req.cookies["userType"] ? req.cookies["userType"] : "client";
  try{
    if(username.length > 0 && userType === "client"){
      res.clearCookie("username");
      res.clearCookie("userType");
      return res.status(302).redirect(`/login?message=${encodeURIComponent("***you're successfully logged out!")}`);
    }else{
      return res.status(500).redirect(`/?message=${encodeURIComponent("***something went wrong, unable to log out!")}`);
    }
  }catch(err){
    next(err.message);
  }
}

export default clientController;