import bcrypt from "bcrypt";
import fs from "node:fs/promises";
import path from "node:path/posix";

class Admin {
  constructor(id, name, govnDocType, govnDocID, address, phone, email, password) {
    this.id = id;
    this.name = name;
    this.govnDocType = govnDocType;
    this.govnDocID = govnDocID;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }
  async addAdmin() {
    const fileName = "admin.json";
    const filePath = path.resolve("config", fileName);
    let admins;
    try {
      const content = await fs.readFile(filePath, "utf8");
      admins = content.length > 0 ? JSON.parse(content) : [];
    } catch (err) {
      return new Error("Unable to read the file, error:", err.message);
    }
    const adminFound = admins.find(
      (admin) => admin.id === this.id && admin.govnDocID === this.govnDocID,
    );
    if (adminFound) {
      return new Error("Admin already registered!");
    }
    const saltRound = 10;
    const encryptedPsw = await bcrypt.hash(this.password, saltRound);
    admins.push({
      id: this.id,
      name: this.name,
      govnDocType: this.govnDocType,
      govnDocID: this.govnDocID,
      address: this.address,
      phone: this.phone,
      email: this.email,
      password: encryptedPsw,
    });
    try {
      await fs.writeFile(filePath, JSON.stringify(admins), "utf8");
      return { message: "Success! admin registered!" };
    } catch (err) {
      return new Error("Unable to register the admin, error:", err.message);
    }
  }
  static async findAdmin(id) {
    const fileName = "admin.json";
    const filePath = path.resolve("config", fileName);
    let admins;
    try {
      const content = await fs.readFile(filePath, "utf8");
      admins = content.length > 0 ? JSON.parse(content) : [];
    } catch (err) {
      return new Error("Unable to read the file, error:", err.message);
    }
    const adminFound = admins.find(
      (admin) => admin.id === id
    );
    if (!adminFound) {
      return new Error("No such admin found!");
    }
    return adminFound;
  }
}

export default Admin;
