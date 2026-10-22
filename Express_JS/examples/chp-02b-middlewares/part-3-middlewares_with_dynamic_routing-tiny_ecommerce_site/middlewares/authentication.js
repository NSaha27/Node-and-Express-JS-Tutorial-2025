import jwt from "jsonwebtoken";
import env from "../config/validation.js";

function authentication(req, res, next){
  const token = req.session.token || "";
  if(token.length === 0){
    next(new Error("Token not found!"));
  }
  const ID = jwt.verify(token, env.JWT_SECRET_KEY, {algorithms: ["HS256"]});
  if(!ID){
    next(new Error("Please login at first!"));
  }
  res.locals.authResult = {ID: ID, message: `Welcome back ${ID}!`};
  next();
}

export default authentication;