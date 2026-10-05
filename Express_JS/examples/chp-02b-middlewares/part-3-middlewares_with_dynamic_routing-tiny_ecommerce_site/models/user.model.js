import bcrypt from "bcrypt";
import fs from "node:fs/promises";
import path from "node:path/posix";

class User{
  constructor(id, name, gender, address, phone, email, password){
    this.id = id;
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
    let users;
    try{
      const content = await fs.readFile(filePath, "utf8");
      users = content.length > 0 ? JSON.parse(content) : [];
    }catch(err){
      return new Error("Unable to read the file, error:", err.message);
    }
    const userFound = users.find(user => user.id === this.id && user.phone === this.phone);
    if(userFound){
      return new Error("User already registered!");
    }
    const saltRound = 10;
    const encryptedPsw = await bcrypt.hash(this.password, saltRound);
    users.push({id: this.id, name: this.name, gender: this.gender, address: this.address, phone: this.phone, email: this.email, password: encryptedPsw});
    try{
      await fs.writeFile(filePath, JSON.stringify(users), "utf8");
      return {message: "Success! user registered!"};
    }catch(err){
      return new Error("Unable to register the user, error:", err.message);
    }
  }
  static async findUser(id){
    const fileName = "user.json";
    const filePath = path.resolve("config", fileName);
    let users;
    try {
      const content = await fs.readFile(filePath, "utf8");
      users = content.length > 0 ? JSON.parse(content) : [];
    } catch (err) {
      return new Error("Unable to read the file, error:", err.message);
    }
    const userFound = users.find(
      (user) => user.id === id
    );
    if(!userFound){
      return new Error("No such user found!");
    }
    return userFound;
  }
}

export default User;