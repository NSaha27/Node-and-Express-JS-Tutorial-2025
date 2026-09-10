import fs from "node:fs/promises";
import path from "node:path/posix";
import { RegFormValdSchema } from "../config/validate.js";

const loadRegistrationPage = async(req, res) => {
  const fileName = "registration.html";
  const filePath = path.join(import.meta.dirname, "views", fileName);
  try{
    const pageContent = await fs.readFile(filePath, "utf8");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    return res.send(pageContent);
  }catch(err){
    res.statusCode = 302;
    res.setHeader("Location", "/404");
    return res.send();
  }
};

const handleRegistration = async(req, res) => {
  const result = RegFormValdSchema.safeParse(req.body);
  if(!result.success){
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    return res.send(JSON.stringify({message: `Invalid form data, error(s): ${result.error.issues.join(", ")}`}));
  }
  let users;
  const fileName = "user.json";
  try{
    const data = await fs.readFile(`/data/${fileName}`, "utf-8");
    users = data.length > 0 ? JSON.parse(data) : [];
  }catch(err){
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.send(JSON.stringify({ message: `Unable to read the file, error: ${err.message}` }));
  }
  const userFound = users.find(user => user.username === result.data.username && user.phone === result.data.phone);
  if(userFound){
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    return res.send(JSON.stringify({ message: "User already registered!" }));
  }
  users.push(result.data);
  try{
    await fs.writeFile(`/data/${fileName}`, JSON.stringify(users), "utf-8");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.send(JSON.stringify({message: "Registration successful, please log in now!"}));
  }catch(err){
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.send(JSON.stringify({ message: `Unable to register the user, error: ${err.message}`}));
  }
}

export { handleRegistration, loadRegistrationPage };
