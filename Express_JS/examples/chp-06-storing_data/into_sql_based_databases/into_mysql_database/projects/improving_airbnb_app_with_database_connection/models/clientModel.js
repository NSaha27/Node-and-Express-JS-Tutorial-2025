import conn from "../utils/dbConnection.js";

class Client{
  constructor(username, name, address, phone, email, password){
    this.username = username;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }

  async save(){
    
  }

  static async fetchAll(){
    try{
      const sql = "SELECT * FROM clients";
      const [rows, fields] = conn.execute(sql);
      return rows.length > 0 ? rows : [];
    }catch(err){
      throw new Error(`*** unable to fetch client infos from database, error: ${err.message}`);
    }
  }

  static async findClientByUsername(username){
    
  }
}

export default Client;