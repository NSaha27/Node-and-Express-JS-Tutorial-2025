/*
  Title: Handle User and Their Uptime Monitor Data Saving Operations
  Description: Here, a function will be created to save the data corresponding to  users and their uptime monitors to .json files. Where one json file will hold data for one user only. 
  Author: Niladri Saha
  Date: 04-11-2025
*/

// dependencies
import fs from "fs";
import path from "path";

// module scaffolding
const lib = {};

lib.basedir = path.join(process.cwd(), ".data/");

lib.create = (newData, cb) => {
  const dir = "users";
  const filename = "users.json";
  const filePath = lib.basedir + dir + "/" + filename;
  try{
    if(fs.existsSync(filePath)){
      fs.readFile(filePath, "utf-8", (err, data) => {
        if(err){
          throw new Error("unable to fetch users!");
        }
        const dataToSave = data ? JSON.parse(data) : [];
        dataToSave.push(JSON.parse(JSON.parse(newData)));
        fs.writeFile(filePath, JSON.stringify(dataToSave), (err2) => {
          if(err2){
            throw new Error("something went wrong, unable to save the data!");
          }
          cb("data were saved successfully!");
        })
      })
    }else{
      const dataToSave = [JSON.parse(JSON.parse(newData))];
      fs.writeFile(filePath, JSON.stringify(dataToSave), (err2) => {
        if(err2){
          throw new Error("something went wrong, unable to save the data!");
        }
        cb("data were saved successfully!");
      })
    }
  }catch(e){
    cb(e.message);
  }
};

lib.readOne = (username, cb) => {
  const dir = "users";
  const filename = "users.json";
  const filePath = lib.basedir + dir + "/" + filename;
  try{
    fs.open(filePath, "r", (err, fd) => {
      if(err){
        throw new Error("no such file exists!");
      }else{
        fs.readFile(fd, "utf-8", (err2, data) => {
          const userData = data;
          if(err2){
            throw new Error("something went wrong, unable to read the file!");
          }else{
            const users = JSON.parse(userData);
            const selectedUser = users.filter((user, indx, arr) => user.username === username.toUpperCase());
            fs.close(fd, (err3) => {
              throw new Error("unable to close the file!");
            })
            cb(JSON.stringify(selectedUser[0]));
          }
        })
      }
    });
  }catch(e){
    cb(e.message);
  }
}

lib.readMultiple = (cb) => {
  const dir = "users";
  const filename = "users.json";
  const filePath = lib.basedir + dir + "/" + filename;
  try{
    fs.open(filePath, "r", (err, fd) => {
      if(err){
        throw new Error("unable to open the file!");
      }
      fs.readFile(fd, "utf-8", (err2, data) => {
        const userData = data;
        if(err2){
          throw new Error("unable to read the file!")
        }
        fs.close(fd, (err3) => {
          if(err3){
            throw new Error("unable to close the file!");
          }
          cb(userData);
        })
      })
    })
  }catch(e){
    cb(e.message);
  }
}

lib.update = (updatedData, cb) => {
  const dir = "users";
  const filename = "users.json";
  const filePath = lib.basedir + dir + "/" + filename;
  const updatedUserData = JSON.parse(JSON.parse(updatedData));
  try{
    fs.open(filePath, "r+", (err, fd) => {
      if(err){
        throw new Error(err.message);
      }
      fs.readFile(fd, "utf-8", (err2, data) => {
        if(err2){
          throw new Error(err2.message);
        }
        const users = JSON.parse(data);
        const userAt = users.findIndex((user, indx, arr) => user.username === updatedUserData.username);
        if(userAt === -1){
          throw new Error("no such user found!");
        }
        users.splice(userAt, 1, updatedUserData);
        fs.ftruncate(fd, (err3) => {
          if(err3) throw new Error("unable to truncate the file!");
          fs.writeFile(fd, JSON.stringify(users), (err4) => {
            if(err4){
              throw new Error(err3.message);
            }
            fs.close(fd, (err5) => {
              if(err5){
                throw new Error("unable to close the file!");
              }
              cb("user was successfully updated!");
            })
          })
        })
      })
    })
  }catch(e){
    cb(e.message);
  }
}

lib.delete = (username, cb) => {
  const dir = "users";
  const filename = "users.json";
  const filePath = lib.basedir + dir + "/" + filename;
  try{
    fs.open(filePath, "r+", (err, fd) => {
      if(err) throw new Error("unable to open the file!");
      fs.readFile(fd, "utf-8", (err2, data) => {
        if(err2) throw new Error("unable to read the file!");
        const users = JSON.parse(data);
        const userFoundAt = users.findIndex((user, indx, arr) => user.username === username);
        if(userFoundAt === -1){
          throw new Error("no such user found!");
        }
        users.splice(userFoundAt, 1);
        fs.ftruncate(fd, (err3) => {
          if(err3) throw new Error("unable to truncate the file!");
          fs.writeFile(fd, JSON.stringify(users), (err4) => {
            if(err4) throw new Error("unable to write to the file!");
            fs.close(fd, (err5) => {
              if(err5) throw new Error("unable to close the file!");
              cb("user was deleted successfully!");
            })
          })
        })
      })
    })
  }catch(e){
    cb(e.message);
  }
};

export default lib;