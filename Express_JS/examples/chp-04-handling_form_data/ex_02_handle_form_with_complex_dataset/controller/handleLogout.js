async function handleLogout(req, res){
  try{
    req.session.destroy();
    res
      .status(302)
      .setHeader("message", "successfully logged out!")
      .redirect("/user/login");
  }catch(err){
    res.status(500).setHeader("message", "Something went wrong, unable to logout!");
  }
}

export default handleLogout;