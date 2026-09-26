import bcrypt from "bcrypt";
import fs from "node:fs/promises";
import path from "node:path/posix";

class User{
  constructor(ID, name, phone, email, password){
    this.id = ID;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }
  async addUser(){
    const fileName = "user.json";
    const filePath = path.resolve("data", fileName);
    let existingUsers;
    try{
      const fileContent = await fs.readFile(filePath, "utf8");
      existingUsers = fileContent.length > 0 ? JSON.parse(fileContent) : [];
    }catch(err){
      return err;
    }
    const userFound = existingUsers.find(user => user.name === this.name && user.phone === this.phone);
    if(userFound){
      throw new Error("User already registered!");
    }
    const saltRound = 10;
    const encryptedPassword = await bcrypt.hash(this.password, saltRound);
    existingUsers.push({
      id: this.id,
      name: this.name,
      phone: this.phone,
      email: this.email,
      password: encryptedPassword,
    });
    try{
      await fs.writeFile(filePath, JSON.stringify(existingUsers), "utf8");
      return {message: "Success! user registered"};
    }catch(err){
      return err;
    }
  }
  static async findUser(ID){
    const fileName = "user.json";
    const filePath = path.resolve("data", fileName);
    let existingUsers;
    try {
      const fileContent = await fs.readFile(filePath, "utf8");
      existingUsers = fileContent.length > 0 ? JSON.parse(fileContent) : [];
    } catch (err) {
      return err;
    }
    const userFound = existingUsers.find(
      (user) => user.id === ID
    );
    if (!userFound) {
      throw new Error("No such user is found!");
    }
    return userFound;
  }
}

export default User;