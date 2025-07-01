
// module scaffolding
const airbnbController = {};

airbnbController.loadHomePage = (req, res, next) => {
  const message = req.headers["message"] ? req.headers["message"] : "";
  const username = req.cookies["username"] ? req.cookies["username"] : "";
  const userType = req.cookies["userType"] ? req.cookies["userType"] : "client";
  const isLoggedIn = username.length > 0 ? true : false;

  try{
    return res.status(200).render("common/index", {pageTitle: "Home page", username: username, message: message, isLoggedIn: isLoggedIn, userType: userType});
  }catch(err){
    next(err.message);
  }
};

export default airbnbController;