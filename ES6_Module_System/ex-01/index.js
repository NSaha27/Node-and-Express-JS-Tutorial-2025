import fs from "fs";
import http from "http";
import path from "path";
import url from "url";

import bcrypt from "bcrypt";
import dotenv from "dotenv";

import Student from "./Student.js";

dotenv.config();

const getLoggedInUsersFilePath = () => {
    const fileName = "loggedInUsers.txt";
    const filePath = path.join("./public", fileName);
    return filePath;
  };

const server = http.createServer((req, res) => {
  const req_url = req.url.split("?")[0];
  const query_params = req.url.split("?")[1];
  const req_method = req.method;

  if(req_url === "/user-signup" && req_method === "POST"){
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", async () => {
      const parsedSignUpData = Buffer.concat(chunks).toString();
      const {ssn, name, sex, address, phone, email, password} = JSON.parse(parsedSignUpData);
      // const ssn = parsedSSN.split("=")[1];
      // const name = parsedName.split("=")[1];
      // const sex = parsedSex.split("=")[1];
      // const address = parsedAddress.split("=")[1];
      // const phone = parsedPhone.split("=")[1];
      // const email = parsedEmail.split("=")[1];
      // const password = parsedPassword.split("=")[1];
      if(!ssn || !name || !sex || !address || !phone || !email || !password){
        res.end("***all fields are required!");
        return false;
      }
      const student = new Student(ssn, name, sex, address, phone, email, password);
      try{
        await student.saveStudent();
        return res.end("*** the new student was added successfully!");
      }catch(err){
        console.error(err.message);
        res.end(err.message);
        return false;
      }
    })
    req.on("error", (err) => {
      console.error(err.message);
      return false;
    })
  }else if(req_url === "/user-login" && req_method === "POST"){
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", async () => {
      const parsedLoginData = Buffer.concat(chunks).toString();
      const {username, password} = JSON.parse(parsedLoginData);
      if(!username || !password){
        res.end("*** all fields are required!");
        return false;
      }
      try{
        const studentFound = await Student.findStudent(username);
        const isPswMatched = await bcrypt.compare(password, studentFound.password);
        if(!isPswMatched){
          throw new Error("*** invalid password!");
        }
        await fs.promises.appendFile(getLoggedInUsersFilePath(), `${username}\n`);
        setTimeout(async () => {
          const loggedInUsers = (await fs.promises.readFile(getLoggedInUsersFilePath(), "utf-8")).split("\n");
          const usernameFoundAt = loggedInUsers.indexOf(username);
          if(usernameFoundAt !== -1){
            loggedInUsers.splice(usernameFoundAt, 1);
          }
          await fs.promises.writeFile(getLoggedInUsersFilePath(), loggedInUsers.join("\n"));
          console.log("*** you're now logged out!");
        }, 1000*60*60);
        return res.end("*** log in successful!");
      }catch(err){
        res.end(err.stack);
        return false;
      }
    });
    req.on("error", (err) => {
      console.error(err.message);
      return false;
    })
  }else if(req_url === "/user-account" && req_method === "PUT"){
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", async () => {
      const parsedUpdateData = Buffer.concat(chunks).toString();
      const {ssn, name, sex, address, phone, email, password} = JSON.parse(parsedUpdateData);
      if(!ssn || !name || !sex || !address || !phone || !email || !password){
        res.end("*** all the fields are required!");
        return false;
      }
      // check if the student is logged in or not
      let loggedInUserList = await fs.promises.readFile(getLoggedInUsersFilePath(), "utf-8");
      loggedInUserList = loggedInUserList.split("\n");
      if(!loggedInUserList.includes(ssn)){
        res.end("*** please log in at first!");
        return false;
      }
      try{
        await Student.updateAStudent({ssn, name, sex, address, phone, email, password});
        return res.end("*** we've updated the student info!");
      }catch(err){
        res.end(err.message);
        return false;
      }
    });
    req.on("error", (err) => {
      console.error(err.message);
      return false;
    })
  }else if(req_url === "/user-logout" && req_method === "GET" && query_params.length > 0){
    const parsedURL = url.parse(req.url, true);
    const queryParams = parsedURL.query;
    let id = "";
    if(Object.keys(queryParams).includes("id")){
      id = queryParams.id;
    }
    if(id.length === 0){
      res.end("*** student ID is required!");
      return false;
    }
    fs.readFile(getLoggedInUsersFilePath(), "utf-8", (err, data) => {
      if(err){
        res.end(err.message);
        return false;
      }
      const loggedInStudents = data ? data.split("\n") : [];
      if(loggedInStudents.length === 0){
        res.end("*** log out failed!");
        return false;
      }
      if(!loggedInStudents.includes(id)){
        res.end("*** log out failed!");
        return false;
      }
      const loggedinStuFoundAt = loggedInStudents.indexOf(id);
      loggedInStudents.splice(loggedinStuFoundAt, 1);
      fs.writeFile(getLoggedInUsersFilePath(), loggedInStudents.join("\n"), (er) => {
        if(er){
          res.end(`*** unable to log out, error: ${er.message}`);
          return false;
        }
        return res.end("*** successfully logged out!");
      });
    });
  }else if(req_url === "/user-delete" && req_method === "DELETE"){
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", async () => {
      const parsedDelData = Buffer.concat(chunks).toString();
      const {ssn} = JSON.parse(parsedDelData);
      if(!ssn){
        res.end("*** SSN number is required!");
        return false;
      }
      try{
        await Student.deleteAStudent(ssn);
        return res.end(`*** the student with the SSN number "${ssn}" has been deleted!`);
      }catch(err){
        res.end(err.message);
        return false;
      }
    });
    req.on("error", (err) => {
      res.end(err.message);
      return false;
    })
  }else if(req_url === "/" && req_method === "GET"){
    return res.end("Welcome to our first API program using pure Node.js");
  }
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";
server.listen(PORT, HOST, (err) => {
  if(err){
    console.error(err.message);
  }else{
    console.log(`server was started at http://${HOST}:${PORT}`);
  }
})