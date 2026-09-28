import jwt from "jsonwebtoken";
import fs from "node:fs/promises";
import path from "node:path/posix";

const loadHomePage = async(req, res) => {
  const token = req.session.jwt_token || "";
  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
    { algorithms: ["HS256"] },
    async (err, payload) => {
      if (err) {
        const fileName = "index.html";
        const filePath = path.resolve("views", fileName);
        try {
          const fileContent = await fs.readFile(filePath, "utf8");
          return res.status(200).send(fileContent);
        } catch (err) {
          console.error(err.message);
          return res.status(404).redirect("/404");
        }
      } else {
        res.status(200).redirect("/user/dashboard");
      }
    },
  );
};

const load404Page = async(req, res) => {
  const fileName = "404.html";
  const filePath = path.resolve("views", fileName);
  try{
    const fileContent = await fs.readFile(filePath, "utf8");
    return res.status(200).send(fileContent);
  }catch(err){
    res.status(502).send("502 Bad gateway!");
  }
}

export {loadHomePage, load404Page};