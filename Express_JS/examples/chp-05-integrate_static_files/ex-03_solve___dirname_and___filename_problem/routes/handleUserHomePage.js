import fs from "node:fs/promises";
import path from "node:path/posix";

const loadUserHomePage = async(req, res) => {
  const fileName = "userHome.html";
  const filePath = path.join(import.meta.dirname, "views", fileName);
  try{
    const pageContent = await fs.readFile(filePath, "utf8");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    return res.send(pageContent);
  }catch(err){
    console.error(err);
    res.statusCode = 404;
    res.setHeader("Location", "/404");
    return res.send();
  }
}

export default loadUserHomePage;