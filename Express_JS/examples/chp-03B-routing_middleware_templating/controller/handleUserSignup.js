import User from "../model/user.js";

async function handleUserSignup(req, res){
  const reqBody = req.body || {};
  if(Object.keys(reqBody).length === 0){
    return res.status(400).json({message: "Invalid request body!"});
  }
  if(reqBody.username.length === 0 || reqBody.name.length === 0 || reqBody.phone.length === 0 || reqBody.email.length === 0 || reqBody.password.length === 0 || reqBody.confirmPassword.length === 0){
    return res.status(400).json({message: "All fields are required!"});
  }
  if(reqBody.password !== reqBody.confirmPassword){
    return res.status(400).json({message: "Password and Confirm password must be same!"});
  }
  const newUser = new User(reqBody.username, reqBody.name, reqBody.phone, reqBody.email, reqBody.password);
  try{
    const result = await newUser.addUser();
    return res.status(200).send(result);
  }catch(err){
    return res.status(500).json({message: err.message});
  }
}

export default handleUserSignup;