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
    const existingHosts = await Host.fetchAll();
    const foundAt = existingHosts.findIndex(
      (host) => host.name === this.name && host.ssn === this.ssn
    );
    if (foundAt !== -1) {
      return "*** host with the same ssn number is already registered!";
    }
    try {
      const sql =
        "INSERT INTO hosts(username, name, ssn, address, phone, email, password) VALUES ('', '', '', '', '', '', '')";
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
      const [result, fields] = conn.execute(sql, value);
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(`*** unable to register the host, error: ${err.message}`);
    }
  }

  static async fetchAll() {
    try {
      const [rows, fields] = await conn.execute("SELECT * FROM hosts");
      return rows.length > 0 ? rows : [];
    } catch (err) {
      throw new Error(`*** unable to find hosts, error: ${err.message}`);
    }
  }

  static async findByUsername(username) {
    if(username.length === 0){
      return "*** please enter a valid username!";
    }
    const existingHosts = await Host.fetchAll();
    const foundHost = existingHosts.filter(host => host.username === username);
    if(foundHost.length > 0){
      return foundHost[0];
    }else{
      return "*** no such host with this username is found!";
    }
  }
}

export default Host;
