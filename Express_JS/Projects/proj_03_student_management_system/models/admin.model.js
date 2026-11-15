import bcrypt from "bcrypt";
import { getDB } from "../config/db.js";
import { MongoServerError } from "mongodb";

class Admin {
  constructor(Id, name, phone, email, password){
    this.adminId = Id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }
  async addAdmin(){
    try{
      const db = getDB();
      const adminCollection = db.collection("admin");
      console.log("Admin collection created!");
      
      const adminFound = await adminCollection.findOne({_id: this.adminId, phone: this.phone});
      if(adminFound){
        return {message: "Admin already registered!"};
      }
      const saltRound = 10;
      const encryptedPsw = await bcrypt.hash(this.password, saltRound);
      const result = await adminCollection.insertOne({_id: this.adminId, name: this.name, phone: this.phone, email: this.email, password: encryptedPsw});
      if(!result){
        return {message: "Unable to register!"};
      }
      return {message: "Registration successful!", adminId: result.insertedId};
    }catch(err){
      console.error(err.message);
      throw err;
    }
  }
  static async findAdmin(Id){
    if(typeof Id !== "string" || Id.length === 0){
      throw new Error("Invalid admin Id!");
    }
    try{
      const db = getDB();
      const adminFound = await db.collection("admin").findOne({_id: Id});
      if(!adminFound){
        return {message: "No such admin found!"};
      }
      return adminFound;
    }catch(err){
      if(err instanceof MongoServerError){
        console.error(err.message);
      }
      throw err;
    }
  }
}

export default Admin;