import conn from "../utils/dbConnection.js";

class Client {
  constructor(
    username,
    name,
    gender,
    idType,
    idNumber,
    address,
    phone,
    email,
    password
  ) {
    this.username = username;
    this.name = name;
    this.gender = gender;
    this.idType = idType;
    this.idNumber = idNumber;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }

  async save() {
    const clientFound = await Client.findByIdNumberPhone(
      this.idNumber,
      this.phone
    );
    if (clientFound) {
      return "*** you're already registered, please log in!";
    }
    try {
      const sql =
        "INSERT INTO clients(username, name, gender, idType, idNumber, address, phone, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [
        this.username,
        this.name,
        this.gender,
        this.idType,
        this.idNumber,
        this.address,
        this.phone,
        this.email,
        this.password,
      ];
      const [result, fields] = await conn.execute(sql, values);
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(
        `*** something went wrong, unable to register the client, error: ${err.message}`
      );
    }
  }

  static async fetchAll() {
    try {
      const sql = "SELECT * FROM clients";
      const [rows, fields] = await conn.execute(sql);
      return rows.length > 0 ? rows : [];
    } catch (err) {
      throw new Error(
        `*** unable to fetch client infoes from database, error: ${err.message}`
      );
    }
  }

  static async findByIdNumberPhone(idNumber, phone) {
    if (idNumber.length === 0) {
      return "*** please enter a valid ID number!";
    }
    if (phone.length === 0) {
      return "*** please enter a valid phone number!";
    }
    try {
      const sql = "SELECT * FROM hosts WHERE idNumber = ?, phone = ?";
      const values = [idNumber, phone];
      const [rows, fields] = await conn.execute(sql, values);
      return rows.length > 0 ? rows[0] : {};
    } catch (err) {
      throw new Error(`*** unable to find the client, error: ${err.message}`);
    }
  }

  static async findByUsername(username) {
    if (username.length === 0) {
      return "*** please enter a valid username!";
    }
    try {
      const sql = "SELECT * FROM clients WHERE username = ?";
      const values = [username];
      const [rows, fields] = await conn.execute(sql, values);
      return rows.length > 0 ? rows[0] : {};
    } catch (err) {
      throw new Error(`*** unable to find the client, error: ${err.message}`);
    }
  }
}

export default Client;
