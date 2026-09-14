import fs from "node:fs/promises";
import path from "node:path/posix";

class User{
  constructor(username, name, phone, email, password){
    this.username = username;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }
  async addUser(){
    const fileName = "user.json";
    const filePath = path.resolve("data", fileName);
    let users;
    try{
      const result = await fs.readFile(filePath, "utf8");
      users = result.length > 0 ? JSON.parse(result) : [];
    }catch(err){
      throw new Error("Unable to read the file content, error: " + err.message);
    }
    const userFound = users.find(user => user.username === this.username);
    if(userFound){
      throw new Error("User already registered!");
    }
    users.push({username: this.username, name: this.name, phone: this.phone, email: this.email, password: this.password});
    try{
      await fs.writeFile(filePath, JSON.stringify(users), "utf8");
      return JSON.stringify({message: "Success! user registered"});
    }catch(err){
      throw new Error("Unable to add the user, error: " + err.message);
    }
  }
  static async findUser(username){
    const fileName = "user.json";
    const filePath = path.resolve("data", fileName);
    let users;
    try {
      const result = await fs.readFile(filePath, "utf8");
      users = result.length > 0 ? JSON.parse(result) : [];
    } catch (err) {
      throw new Error("Unable to read the file content, error: " + err.message);
    }
    const userFound = users.find((user) => user.username === username);
    if (!userFound) {
      throw new Error("No such user found!");
    }
    return JSON.stringify({user: userFound});
  }
}

export default User;