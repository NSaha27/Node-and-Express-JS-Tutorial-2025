import bcrypt from "bcrypt";
import {ObjectId} from "mongodb";

import { getDB } from "../config/db.js";

class Admin {
  constructor(username, name, govnDocType, govnDocID, address, phone, email, password) {
    this.username = username;
    this.name = name;
    this.govnDocType = govnDocType;
    this.govnDocID = govnDocID;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }
  async addAdmin() {
    try{
      const db = getDB();
      const adminCollection = db.collection("admin");

      const adminFound = await adminCollection.findOne({
        govnDocID: this.govnDocID, phone: this.phone
      });
      if (adminFound) {
        return {message: "Admin already exists!"};
      }

      const saltRound = 10;
      const encryptedPsw = await bcrypt.hash(this.password, saltRound);

      const result = await adminCollection.insertOne({
        username: this.username,
        name: this.name,
        govnDocType: this.govnDocType,
        govnDocID: this.govnDocID,
        address: this.address,
        phone: this.phone,
        email: this.email,
        password: encryptedPsw,
      });

      return { message: "Success, admin registered!", registrationId: result.insertedId };
    } catch (err) {
      throw new Error("Unable to register the admin, error:", err.message);
    }
  }
  static async findAdmin(username) {
    try{
      if(username.length === 0){
        return {message: "Invalid Username!"};
      }
      const db = getDB();
      const adminFound = await db.collection("admin").findOne({username: username});
      if(!adminFound){
        return {message: "No such admin was found!"};
      }
      return adminFound;
    }catch(err){
      throw err;
    }
  }
}

export default Admin;
