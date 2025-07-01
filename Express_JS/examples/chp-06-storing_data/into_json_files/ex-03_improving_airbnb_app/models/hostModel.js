import fs from "node:fs/promises";
import path from "node:path";

class Host{
  constructor(username, name, ssn, address, phone, email, password){
    this.username = username;
    this.name = name;
    this.ssn = ssn;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }

  async save(){
    try{
      const filePath = path.resolve(process.cwd(), "data", "host.json");
      const data = await fs.readFile(filePath, "utf-8");
      const registeredHosts = data ? JSON.parse(data) : [];
      if(registeredHosts.length > 0){
        const hostFoundAtIndex = registeredHosts.findIndex((host, indx) => host.username === this.username && host.ssn === this.ssn);
        if(hostFoundAtIndex !== -1){
          return "*host with the same username or ssn already exists!";
        }else{
          try{
            registeredHosts.push(this);
            await fs.writeFile(filePath, JSON.stringify(registeredHosts));
            return true;
          }catch(err){
            throw new Error(err.message);
          }
        }
      }else{
        try{
          registeredHosts.push(this);
          await fs.writeFile(filePath, JSON.stringify(registeredHosts));
          return true;
        }catch(err){
          throw new Error(err.message);
        }
      }
    }catch(err){
      throw new Error(err.message);
    }
  }

  static async findHostByUsername(username){
    try{
      const filePath = path.resolve(process.cwd(), "data", "host.json");
      try{
        const data = await fs.readFile(filePath, "utf-8");
        const registeredHosts = data ? JSON.parse(data) : [];
        if(registeredHosts.length > 0){
          const hostFound = registeredHosts.filter(host => host.username === username);
          if(hostFound.length > 0){
            return hostFound[0];
          }else{
            return "*no host with this username was found!";
          }
        }else{
          return "*no host with this username was found!";
        }
      }catch(err){
        throw new Error(err.message);
      }
    }catch(err){
      throw new Error(err.message);
    }
  }
}

export default Host;