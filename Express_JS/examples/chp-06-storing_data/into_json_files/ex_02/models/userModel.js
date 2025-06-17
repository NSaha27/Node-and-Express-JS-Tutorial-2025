import fs from "fs";
import path from "path";

class User{
  constructor(username, name, ssn, gender, address, nationality, phone, email, password){
    this.username = username;
    this.name = name;
    this.ssn = ssn;
    this.gender = gender;
    this.address = address;
    this.nationality = nationality;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }
  save(cb){
    const filePath = path.resolve(process.cwd(), ".data", "users.json");
    if(fs.existsSync(filePath)){
      fs.readFile(filePath, "utf-8", (err, data) => {
        if(err){
          return cb(err.message);
        }
        const registeredUsers = data ? JSON.parse(data) : [];
        const userFoundAt = registeredUsers.findIndex(user => user.ssn === this.ssn && user.phone === this.phone);
        if(userFoundAt !== -1){
          return cb("user with the same ssn and phone number is already registered!");
        }else{
          const newRegisteredUsers = [...registeredUsers, this];
          fs.writeFile(filePath, JSON.stringify(newRegisteredUsers), (err2) => {
            if(err2){
              return cb(err2.message);
            }
            return true;
          })
        }
      })
    }else{
      const data = [this,];
      fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if(err){
          return cb(err.message);
        }
        return true;
      })
    }
  }

  static displayUsers(cb){
    const filePath = path.resolve(process.cwd(), ".data", "users.json");
    if(fs.existsSync(filePath)){
      fs.readFile(filePath, "utf-8", (err, data) => {
        if(err){
          return cb(err.message);
        }
        const users = data ? JSON.parse(data) : [];
        return cb(users);
      })
    }else{
      return cb("no such storage file exists!");
    }
  }

  static displayUserByUsername(username){
    const filePath = path.resolve(process.cwd(), ".data", "users.json");
    if(fs.existsSync(filePath)){
      fs.readFile(filePath, "utf-8", (err, data) => {
        if(err){
          return cb(err.message);
        }
        const users = data ? JSON.parse(data) : [];
        const userByUsername = users.filter(user => user.username === username)[0];
        return cb(userByUsername);
      })
    }else{
      return cb("no such storage file exists!");
    }
  }
}

export default User;