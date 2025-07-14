import Accomodation from "../models/accomodationModel.js";

// module scaffolding
const airbnbController = {};

airbnbController.loadHomePage = async (req, res, next) => {
  const message = req.headers["message"] ? req.headers["message"] : "";
  const username = req.cookies["username"] ? req.cookies["username"] : "";
  const userType = req.cookies["userType"] ? req.cookies["userType"] : "client";
  const isLoggedIn = username.length > 0 ? true : false;

  try{
    const allAccomodations = await Accomodation.findAllAccomodations();
    if(Array.isArray(allAccomodations)){
      return res.status(200).render("common/index", {pageTitle: "Home page", username: username, message: message, isLoggedIn: isLoggedIn, userType: userType, accomodations: allAccomodations});
    }else{
      throw new Error(allAccomodations);
    }
  }catch(err){
    next(err.message);
  }
};

export default airbnbController;