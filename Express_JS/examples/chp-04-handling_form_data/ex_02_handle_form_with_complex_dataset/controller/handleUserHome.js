import fs from "node:fs/promises";
import path from "node:path/posix";

async function loadUserHomePage(req, res){
  const sessionUser = req.session.username || "";
  if(sessionUser.length === 0){
    return res.status(403).setHeader("message", "Please log in at first!").redirect("/user/login");
  }
  const fileName = "user-home.html";
  const filePath = path.resolve("views", "user", fileName);
  try{
    const pageContent = await fs.readFile(filePath, "utf8");
    res.status(200).send(pageContent);
  }catch(err){
    res.status(404).redirect("/404");
  }
}

export default loadUserHomePage;