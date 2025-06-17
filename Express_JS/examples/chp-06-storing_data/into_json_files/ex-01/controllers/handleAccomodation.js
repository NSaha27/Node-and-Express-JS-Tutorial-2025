import Accomodation from '../models/accomodations.js';

function dispAddAccomodationPage(req, res, next){
  try{
    res.render("addAccomodation", {pageTitle: "Register Your Accomodation", userType: "host"});
  }catch(err){
    next(err.message);
  }
}

function addAccomodation(req, res, next){
  const reqBody = req.body;
  try {
    // add accomodation 
    const newAccomodation = new Accomodation(reqBody.buildingName, reqBody.imageURL, reqBody.location, reqBody.amenities, reqBody.price, reqBody.rating);
    newAccomodation.save();
    res.setHeader("message", "accomodation was added successfully!");
    res.redirect("/");
  } catch (error) {
    next(error.message);
  }
}

function dispAccomodation(req, res, next){
  try{
    Accomodation.displayAccomodations((accomodations) => {
      res.render("index", {pageTitle: "Home", userType: "user", accomodations: accomodations});
    });
  }catch(err){
    next(err.message);
  }
}

export { addAccomodation, dispAccomodation, dispAddAccomodationPage };

