import conn from "../utils/dbConnection.js";

class Host {
  constructor(username, name, ssn, address, phone, email, password) {
    this.username = username;
    this.name = name;
    this.ssn = ssn;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }

  async save() {
    const hostFound = await Host.findBySSNPhone(this.ssn, this.phone);
    if (Object.entries(hostFound).length > 0) {
      return "*** host with the same ssn and phone number is already registered!";
    }
    try {
      const sql =
        "INSERT INTO hosts(username, name, ssn, address, phone, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const value = [
        this.username,
        this.name,
        this.ssn,
        this.address,
        this.phone,
        this.email,
        this.password,
      ];
      /*
      // simple query style
      const [result, fields] = await conn.query(`INSERT INTO hosts(username, name, ssn, address, phone, email, password) VALUES('${this.username}', '${this.name}', '${this.ssn}', '${this.address}', '${this.phone}', '${this.email}', '${this.password}')`);
      */
      // prepared statement style
      const [result, fields] = await conn.execute(sql, value);
      return result ? true : false;
    } catch (err) {
      throw new Error(`*** unable to register the host, error: ${err.message}`);
    }
  }

  static async fetchAll() {
    try {
      const [rows, fields] = await conn.execute("SELECT * FROM hosts");
      return rows.length > 0 ? rows : [];
    } catch (err) {
      throw new Error(`*** unable to fetch host infoes, error: ${err.message}`);
    }
  }

  static async findBySSNPhone(ssn, phone) {
    if (ssn.length === 0) {
      return "*** please enter a valid SSN number!";
    }
    if (phone.length === 0) {
      return "*** please enter a valid phone number!";
    }
    try {
      const sql = "SELECT * FROM hosts WHERE ssn = ? AND phone = ?";
      const values = [ssn, phone];
      const [rows, fields] = await conn.execute(sql, values);
      return rows.length > 0 ? rows[0] : {};
    } catch (err) {
      throw new Error(`*** unable to find the host, error: ${err.message}`);
    }
  }

  static async findByUsername(username) {
    if (username.length === 0) {
      return "*** please enter a valid username!";
    }
    try {
      const sql = "SELECT * FROM hosts WHERE username = ?";
      const values = [username,];
      const [rows, fields] = await conn.execute(sql, values);
      return rows.length > 0 ? rows[0] : {};
    } catch (err) {
      throw new Error(`*** unable to find the host, error: ${err.message}`);
    }
  }
}

export default Host;
