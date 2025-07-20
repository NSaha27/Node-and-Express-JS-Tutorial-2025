import bcrypt from "bcrypt";

import Accomodation from "../models/accomodationModel.js";
import Host from "../models/hostModel.js";

// module scaffolding
const hostController = {};

hostController.loadHostSignupPage = (req, res, next) => {
  const message = req.query.message || "";
  const username = req.cookies["username"] ? req.cookies["username"] : "";
  const isLoggedIn = username.length > 0 ? true : false;
  try{
    if(!isLoggedIn){
      return res.status(200).render("common/registration", {pageTitle: "Host sign up", userType: "host", message: message});
    }else{
      return res.status(303).redirect(`/host/home?username=${encodeURIComponent(username)}&message=${encodeURIComponent("***you're already logged in!")}`);
    }
  }catch(err){
    next(err.message);
  }
};

hostController.hostSignup = async (req, res, next) => {
  const {username, name, ssn, address, phone, email, password, confirmPassword} = req.body;
  if(password !== confirmPassword){
    return res.status(303).redirect(`/host/signup?message=${encodeURIComponent("***password and confirm password must be same!")}`);
  }
  const encryptedPsw = await bcrypt.hash(password, 10);
  try{
    const newHost = new Host(username, name, ssn, address, phone, email, encryptedPsw);
    await newHost.save();
    return res.status(302).redirect(`/host/login?message=${encodeURIComponent("***registration successful, please log in now!")}`);
  }catch(err){
    next(err.message);
  }
};

hostController.loadHostLoginPage = (req, res, next) => {
  const message = req.query.message ? req.query.message : "";
  const username = req.cookies["username"] ? req.cookies["username"] : "";
  const isLoggedIn = username.length > 0 ? true : false;
  try{
    if(!isLoggedIn){
      return res.status(200).render("common/login", {pageTitle: "Host log in", userType: "host", message: message});
    }else{
      return res.status(303).redirect(`/host/home?username=${encodeURIComponent(username)}&message=${encodeURIComponent("***you're already logged in!")}`)
    }
  }catch(err){
    next(err.message);
  }
};

hostController.hostLogin = async (req, res, next) => {
  const {username, password} = req.body;
  try{
    const getResult = await Host.findHostByUsername(username);
    if(typeof getResult === "string"){
      return res.status(303).redirect(`/host/login?message=${encodeURIComponent(getResult)}`)
    }else{
      const isPswMatched = await bcrypt.compare(password, getResult.password);
      if(isPswMatched){
        res.cookie("username", username, {maxAge: 60*60*1000, httpOnly: true, sameSite: "strict"});
        res.cookie("userType", "host", {maxAge: 60*60*1000, httpOnly: true, sameSite: "strict"});
        return res.status(302).redirect(`/host/home?message=${encodeURIComponent("***log in successful!")}`);
      }else{
        return res.status(303).redirect(`/host/login?message=${encodeURIComponent("***log in failed, invalid credentials!")}`);
      }
    }
  }catch(err){
    next(err.message);
  }
};

hostController.loadHostHomePage = (req, res, next) => {
  const message = req.query.message ? req.query.message : "";
  const username = req.cookies["username"] ? req.cookies["username"] : "";
  const isLoggedIn = username.length > 0 ? true : false;
  try{
    if(!isLoggedIn){
      return res.status(303).redirect(`/host/login?message=${"***please log in at first!"}`);
    }else{
      return res.status(200).render("host/home", {pageTitle: "Host home page", userType: "host", username: username, message: message});
    }
  }catch(err){
    next(err.message);
  }
};

hostController.hostLogout = (req, res, next) => {
  const username = req.cookies["username"] ? req.cookies["username"] : "";
  const userType = req.cookies["userType"] ? req.cookies["userType"] : "client";
  try{
    if(username.length > 0 && userType === "host"){
      res.clearCookie("username");
      res.clearCookie("userType");
      return res.status(302).redirect(`/host/login?message=${encodeURIComponent("***you're successfully logged out!")}`);
    }else{
      return res.status(303).redirect(`/host/home?message=${encodeURIComponent("***something went wrong, unable to log out!")}`);
    }
  }catch(err){
    next(err.message);
  }
}

hostController.loadAddAccomodationPage = (req, res, next) => {
  const message = req.query.message ? req.query.message : "";
  const username = req.cookies["username"] ? req.cookies["username"] : "";
  const isLoggedIn = username.length > 0 ? true : false;
  try{
    if(isLoggedIn){
      return res.status(200).render("host/addAccomodation", {pageTitle: "Add accomodation", username: username, message: message});
    }else{
      return res.status(303).redirect(`/host/login?message=${encodeURIComponent("***please log in at first!")}`);
    }
  }catch(err){
    next(err.message);
  }
};

hostController.addAccomodation = async (req, res, next) => {
  const {host, buildingName, buildingType, rent, contactNumber, addrBuildingNumber, addrRoad, addrTownVillage, addrDistrict, addrState, addrCountry, addrZipCode} = req.body;
  const buildingImages = req.files ? req.files["buildingImages"] : [];
  try{
    const errorMessage = [];
    if(buildingName.length === 0){
      errorMessage.push("***building name is required!");
    }
    if(buildingType.length === 0){
      errorMessage.push("***building type is required!");
    }
    if(rent.length === 0){
      errorMessage.push("***building rent is required!");
    }
    if(buildingImages.length === 0){
      errorMessage.push("***building images are required!");
    }
    if(contactNumber.length === 0){
      errorMessage.push("***building contact number is required!");
    }
    if(addrBuildingNumber.length === 0){
      errorMessage.push("***building number is required!");
    }
    if(addrRoad.length === 0){
      errorMessage.push("***road name is required!");
    }
    if(addrTownVillage.length === 0){
      errorMessage.push("***town or village name is required!");
    }
    if(addrDistrict.length === 0){
      errorMessage.push("***district name is required!");
    }
    if(addrState.length === 0){
      errorMessage.push("***state name is required!");
    }
    if(addrCountry.length === 0){
      errorMessage.push("***country name is required!");
    }
    if(addrZipCode.length === 0){
      errorMessage.push("***zip code is required!");
    }
    const rating = 3.5;
    if(errorMessage.length > 0){
      return res.status(303).redirect(`/host/add-accomodation?message=${encodeURIComponent(errorMessage)}`);
    }else{
      const imageOriginalNames = buildingImages.map(image => image.originalname);
      const newAccomodation = new Accomodation(host, buildingName, buildingType, rent, imageOriginalNames, contactNumber, addrBuildingNumber, addrRoad, addrTownVillage, addrDistrict, addrState, addrCountry, addrZipCode, rating);
      const result = await newAccomodation.save();
      if(typeof result !== "boolean"){
        return res.status(303).redirect(`/host/add-accomodation?message=${encodeURIComponent(result)}`);
      }else{
        return res.status(302).redirect(`/host/home?message=${encodeURIComponent("***your accomodation was successfully registered to our portal!")}`);
      }
    }
  }catch(err){
    console.log(err.stack);
    
    next(err.message);
  }
}



export default hostController;