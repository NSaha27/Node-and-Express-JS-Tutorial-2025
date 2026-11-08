import bcrypt from "bcrypt";
import {ObjectId} from "mongodb";

import {getDB} from "../config/db.js";

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
    try {
      const db = getDB();
      const userCollection = db.collection("user");

      const userFound = await userCollection.findOne({username: this.username, phone: this.phone});
      if(userFound){
        return {message: "User already registered!"};
      }
      
      const saltRound = 10;
      const encryptedPsw = await bcrypt.hash(this.password, saltRound);

      const result = await userCollection.insertOne({
        username: this.username,
        name: this.name,
        gender: this.gender,
        address: this.address,
        phone: this.phone,
        email: this.email,
        password: encryptedPsw,
      });
      return {message: "Success, user registered!", registrationId: result.insertedId};
    } catch (err) {
      return new Error("Unable to register the user, error:", err.message);
    }
  }
  static async findUser(username){
    try{
      if(username.length === 0){
        return {message: "Invalid Username!"};
      }
      const db = getDB();
      const userCollection = db.collection("user");
      const userFound = await userCollection.findOne({username: username});
      if(!userFound){
        return {message: "No such user found!"};
      }
      return userFound;
    }catch(err){
      throw err;
    }
  }
}

export default User;