import jwt from "jsonwebtoken";
import env from "../config/validation.js";

const authentication = async (req, res, next) => {
  const token = req.session.token || "";
  if(token.length === 0){
    next(new Error("Token not found!"));
  }
  const adminId = jwt.verify(token, env.JWT_SECRET_KEY, {algorithms: ["HS256"]});
  if(!adminId){
    next(new Error("Please log in at first!"));
  }
  res.locals.authResult = {message: "Log in successful!", adminId: adminId};
  next();
}

export default authentication;