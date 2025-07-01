import fs from "node:fs/promises";
import path from "node:path";

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
    try{
      const filePath = path.resolve(process.cwd(), "data", "client.json");
      const data = await fs.readFile(filePath, "utf-8");
      const registeredClients = data ? JSON.parse(data) : [];
      if(registeredClients.length > 0){
        const clientFoundAtIndex = registeredClients.findIndex((client, indx) => client.username === this.username);
        if(clientFoundAtIndex !== -1){
          return "*client with the same username already exists!";
        }else{
          try{
            registeredClients.push(this);
            await fs.writeFile(filePath, JSON.stringify(registeredClients));
            return true;
          }catch(err){
            throw new Error(err.message);
          }
        }
      }else{
        try{
          registeredClients.push(this);
          await fs.writeFile(filePath, JSON.stringify(registeredClients));
          return true;
        }catch(err){
          throw new Error(err.message);
        }
      }
    }catch(err){
      throw new Error(err.message);
    }
  }

  static async findClientByUsername(username){
    try{
      const filePath = path.resolve(process.cwd(), "data", "client.json");
      try{
        const data = await fs.readFile(filePath, "utf-8");
        const registeredClients = data ? JSON.parse(data) : [];
        if(registeredClients.length > 0){
          const clientFound = registeredClients.filter(client => client.username === username);
          if(clientFound.length > 0){
            return clientFound[0];
          }else{
            return "*no client with this username was found!";
          }
        }else{
          return "*no client with this username was found!";
        }
      }catch(err){
        throw new Error(err.message);
      }
    }catch(err){
      throw new Error(err.message);
    }
  }
}

export default Client;