import jwt from "jsonwebtoken";

function handleUserDashboard(req, res){
  const token = req.header("Authorization");
  if(!token){
    return res.status(401).json({message: "Token missing!"});
  }
  let actualToken = "";
  if(token.startsWith("Bearer ")){
    actualToken = token.slice(7, token.length).trimLeft();
  }
  jwt.verify(actualToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if(err){
      return res.json({message: "Invalid token!"});
    }
    const username = decoded.username;
    return res.json({message: `Welcome to the dashboard ${username} !`});
  });

}

export default handleUserDashboard;