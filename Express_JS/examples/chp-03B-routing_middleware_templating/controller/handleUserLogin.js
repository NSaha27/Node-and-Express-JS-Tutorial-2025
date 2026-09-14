import jwt from "jsonwebtoken";
import User from "../model/user.js";

async function handleUserLogin(req, res){
  const reqBody = req.body || {};
  if(Object.keys(reqBody).length === 0){
    return res.status(400).json({message: "Invalid request body!"});
  }
  if(reqBody.username.length === 0 || reqBody.password.length === 0){
    return res.status(400).json({ message: "Invalid login credentials!" });
  }
  let user;
  try{
    const result = await User.findUser(reqBody.username);
    user = JSON.parse(result)["user"];
  }catch(err){
    return res.status(401).json({ message: "Invalid login credentials!" });
  }
  if(user){
    const pswMatched = user.password === reqBody.password;
    if(!pswMatched){
      return res.status(401).json(
        { message: "Invalid login credentials!" }
      );
    }

    /*
    // session management
    req.session.user = reqBody.username;
    */
    
    // Create JWT token and send via response
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
    return res.status(200).json({ message: `Log in successful, welcome back Mr./Ms. ${user.name} !`, token: token });
  }
}

export default handleUserLogin;