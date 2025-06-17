import bcrypt from "bcrypt";
import Accomodation from "../models/accomodationModel.js";
import Host from "../models/hostModel.js";


function loadHostRegistrationPage(req, res, next){
  const message = req.headers["message"] ? req.headers["message"] : "";
  try{
    res.render("register", {pageTitle: "Host Registration", userType: "host", message: message});
  }catch(err){
    next(err.message);
  }
}

async function hostRegistration(req, res, next){
  const {username, name, ssn, address, nationality, phone, email, password, confirmPassword} = req.body;
  if(username.length > 0 && name.length > 0 && ssn.length > 0 && address.length > 0 && nationality.length > 0 && phone.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0){
    const usernameRegex = /^[A-Z0-9]+$/g;
    const nameRegex = /^[a-zA-Z ]+$/g;
    const ssnRegex = /^(?!000|666)[0-8]\d{2}-(?!00)\d{2}-(?!0000)\d{4}$/g;
    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/g;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
    if(!usernameRegex.test(username)){
      next("*username must be a combination of only digits and uppercase letters!");
    }
    if(!nameRegex.test(name)){
      next("*name must have characters and white spaces only!");
    }
    if(!ssnRegex.test(ssn)){
      next("*invalid SSN number!");
    }
    if(!phoneRegex.test(phone)){
      next("*invalid phone number!");
    }
    if(!passwordRegex.test(password)){
      next("*password must have atleast one lowercase letter, atleast one uppercase letter, atleast one digit, atleast one special symbol, and must have atleast 8 characters!");
    }
    if(password !== confirmPassword){
      next("*confirm password and password must be same!");
    }
    // if all the fields are ok, then save the host data to the related json file
    const encryptedPassword = await bcrypt.hash(password, 10);
    try{
      const newHost = new Host(username, name, ssn, address, nationality, phone, email, encryptedPassword);
      newHost.save(result => {
        if(result.length > 0){
          res.setHeader("message", result);
          res.status(302).redirect("/host/registration");
        }else{
          res.setHeader("message", "*registration successful!");
          res.status(302).redirect("/host/login");
        }
      })
    }catch(err){
      next(err.message);
    }
  }else{
    next("*all fields are required!");
  }
}

function loadHostLoginPage(req, res ,next){
  const message = req.headers["message"] ? req.headers["message"] : "";
  try{
    res.render("login", {pageTitle: "Host Log in", userType: "host", message: message});
  }catch(err){
    next(err.message);
  }
}

function hostLogin(req, res, next){
  const {username, password} = req.body;
  if(username.length > 0 && password.length > 0){
    const usernameRegex = /^[A-Z0-9]+$/g;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
    if(!usernameRegex.test(username)){
      res.statusCode = 302;
      res.setHeader("message", "*invalid username or password!");
      res.redirect("/host/login");
    }
    if(!passwordRegex.test(password)){
      res.statusCode = 302;
      res.setHeader("message", "*invalid username or password!");
      res.redirect("/host/login");
    }
    Host.displayHostByUsername(username, async (result) => {
      if(typeof result === "object"){
        const isPswVerified = await bcrypt.compare(password, result.password);
        if(isPswVerified){
          res.statusCode = 302;
          res.setHeader("message", "*log in successful!");
          res.redirect("/host/home");
        }
      }else{
        res.statusCode = 302;
        res.setHeader("message", result);
        res.redirect("/host/login");
      }
    })
  }else{
    res.statusCode = 302;
    res.setHeader("message", "*all fields are required!");
    res.redirect("/host/login");
  }
}

function loadHostHomePage(req, res, next){
  const message = req.headers["message"] ? req.headers["message"] : "";
  try{
    res.render("host/host-home", {pageTitle: "Host Home page", userType: "host", message: message});
  }catch(err){
    next(err.message);
  }
}

function loadAddAccomodationPage(req, res, next){
  const message = req.headers["message"] ? req.headers["message"] : "";
  try{
    res.render("host/add-accomodation", {pageTitle: "Add Accomodation", userType: "host", message: message});
  }catch(err){
    next(err.message);
  }
}

function addAccomodation(req, res, next){
  const {accName, username, accAddress, amenities, rent, contactNumber, contactEmail} = req.body;
  if(accName.length > 0 && accAddress.length > 0 && amenities.length > 0 && rent.length > 0 && contactNumber.length > 0 && contactEmail.length > 0){
    const accNameRegex = /^[a-zA-Z ]+$/g;
    const usernameRegex = /^[A-Z0-9]+$/g;
    const rentRegex = /^(\d*\.?\d{1,2})$/g;
    const contactNumberRegex = /^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/g;
    const contactEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
    if(!accNameRegex.test(accName)){
      res.statusCode = 302;
      res.setHeader("message", "*invalid accomodation name!");
      res.redirect("/host/add-accomodation");
    }
    if(!usernameRegex.test(username)){
      next("*username must be a combination of only digits and uppercase letters!");
    }
    if(!rentRegex.test(rent)){
      res.statusCode = 302;
      res.setHeader("message", "*invalid rent amount!");
      res.redirect("/host/add-accomodation");
    }
    if(!contactNumberRegex.test(contactNumber)){
      res.statusCode = 302;
      res.setHeader("message", "*invalid contact number!");
      res.redirect("/host/add-accomodation");
    }
    if(!contactEmailRegex.test(contactEmail)){
      res.statusCode = 302;
      res.setHeader("message", "*invalid contact email!");
      res.redirect("/host/add-accomodation");
    }
    try{
      const newAccomodation = new Accomodation(accName, username, accAddress, amenities, rent, contactNumber, contactEmail);
      newAccomodation.save(result => {
        if(typeof result === "string"){
          res.statusCode = 302;
          res.setHeader("message", result);
          res.redirect("/host/add-accomodation");
        }else{
          res.statusCode = 302;
          res.setHeader("message", "accomodation has been registered successfully!");
          res.redirect("/host/add-accomodation");
        }
      })
    }catch(err){
      next(err.message);
    }
  }else{
    res.statusCode = 302;
    res.setHeader("message", "*all fields are required!");
    res.redirect("/host/add-accomodation");
  }
}

export { addAccomodation, hostLogin, hostRegistration, loadAddAccomodationPage, loadHostHomePage, loadHostLoginPage, loadHostRegistrationPage };

