// build-in modules
import fs from "node:fs/promises";
import path from "node:path/posix";

class User{
  constructor(username, name, gender, address, phone, email, password){
    this.username = username;
    this.name = name;
    this.gender = gender;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }
  async addUser(){
    const fileName = "user.json";
    const filePath = path.resolve("config", fileName);
    let existingUsers;
    try{
      const fileContent = await fs.readFile(filePath, "utf8");
      existingUsers = fileContent.length > 0 ? JSON.parse(fileContent) : [];
    }catch(err){
      return new Error("Unable to read the file, error: " + err.message);
    }
    const userFound = existingUsers.find(user => user.username === this.username);
    if(userFound){
      return new Error("User already registered!");
    }
    existingUsers.push({username: this.username, name: this.name, gender: this.gender, address: this.address, phone: this.phone, email: this.email, password: this.password});
    try{
      await fs.writeFile(filePath, JSON.stringify(existingUsers, null, 4), "utf8");
      return {message: "Success! user has been registered!", username: this.username};
    }catch(err){
      return new Error("Unable to add the user, error: " + err.message);
    }
  }
  static async findAUser(username){
    const fileName = "user.json";
    const filePath = path.resolve("config", fileName);
    let registeredUsers;
    try{
      const fileContent = await fs.readFile(filePath, "utf8");
      registeredUsers = fileContent.length > 0 ? JSON.parse(fileContent) : [];
    }catch(err){
      return new Error("Unable to read the file, error: " + err.message);
    }
    const userFound = registeredUsers.find(user => user.username === username);
    if(!userFound){
      return new Error("No such user found!");
    }
    return userFound;
  }
}

export default User;