import jwt from "jsonwebtoken";
import env from "../config/validation.js";

function authentication(req, res, next){
  const token = req.session.token || "";
  if(token.length === 0){
    next(new Error("Token not found!"));
  }
  const {username} = jwt.verify(token, env.JWT_SECRET_KEY, {algorithms: ["HS256"]});
  if(!username){
    next(new Error("Please login at first!"));
  }
  res.locals.authResult = {username: username, message: `Welcome back ${username}!`};
  next();
}

export default authentication;