import express from "express";
import fs from "node:fs/promises";
import path from "node:path/posix";

import { EnvFileValdSchema, UserFormValdSchema } from "./config/validation.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/404", async (req, res) => {
  const fileName = "404.html";
  const filePath = path.resolve("views", fileName);
  try{
    const pageContent = await fs.readFile(filePath, "utf-8");

    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    return res.send(pageContent);
  }catch(err){
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.send(
      JSON.stringify({
        message: "Internal server problem!",
        status: false,
        error: err.message,
      }),
    );
  }
})

app.post("/register-user", async (req, res) => {
  const result = UserFormValdSchema.safeParse(req.body);
  if (!result.success) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    return res.send(
      JSON.stringify({ message: "Invalid form data!", status: false }),
    );
  } else {
    const fileName = "user.json";
    const filePath = path.resolve("public", fileName);
    let users;
    try {
      const data = await fs.readFile(filePath, "utf-8");
      users = data.length > 0 ? JSON.parse(data) : [];
    } catch (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      return res.send(
        JSON.stringify({
          message: "Unable to save data!",
          status: false,
          error: err.message,
        }),
      );
    }
    const userExists = users.find(
      (user) => user.username === result.data.username,
    );
    if (userExists) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.send(
        JSON.stringify({ message: "User already registered!", status: false }),
      );
    } else {
      users.push(result.data);
      try {
        await fs.writeFile(filePath, JSON.stringify(users), "utf-8");
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        return res.send(
          JSON.stringify({
            message: "Success, user registered!",
            status: true,
          }),
        );
      } catch (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        return res.send(
          JSON.stringify({
            message: "Unable to save data!",
            status: false,
            error: err.message,
          }),
        );
      }
    }
  }
});

app.get("/", async (req, res) => {
  const fileName = "form.html";
  const filePath = path.resolve("views", fileName);
  try{
    const pageContent = await fs.readFile(filePath, "utf-8");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    return res.send(pageContent);
  }catch(err){
    console.error(err);
    res.statusCode = 302;
    res.setHeader("Location", "/404");
    return res.send();
  }
});

const result = EnvFileValdSchema.safeParse(process.env);
if(!result.success){
  throw new Error("Invalid variable type(s)!");
}else{
  app.listen(result.data.PORT, result.data.HOST, (err) => {
    if(err){
      console.error("Unable to start the server!");
    }else{
      console.log(`Server has been started at http://${result.data.HOST}:${result.data.PORT}`);
    }
  })
}