import fs from "fs/promises";
import path from "path";

class Host{
  constructor(username, name, ssn, address, nationality, phone, email, password){
    this.username = username;
    this.name = name;
    this.ssn = ssn;
    this.address = address;
    this.nationality = nationality;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }
  async save(){
    const filePath = path.resolve(process.cwd(), ".data", "hosts.json");
    try{
      let registeredHosts = [];
      try{
        const data = await fs.readFile(filePath, "utf-8");
        registeredHosts = data ? JSON.parse(data) : [];
      }catch(err){
        if(err.code !== "ENOENT") throw err; // ignore if file doesn't exist
      }
      const hostFoundAt = registeredHosts.findIndex(host => host.ssn === this.ssn && host.phone === this.phone);
      if(hostFoundAt !== -1){
        throw new Error("*Host with the same ssn and phone number is already registered!");
      }
      const newRegisteredHosts = [...registeredHosts, this];
      await fs.writeFile(filePath, JSON.stringify(newRegisteredHosts, null, 2));
      return true;
    }catch(err){
      throw new Error(`*unable to save data: ${err.message}`);
    }
  }

  static displayHosts(cb){
    const filePath = path.resolve(process.cwd(), ".data", "hosts.json");
    if(fs.existsSync(filePath)){
      fs.readFile(filePath, "utf-8", (err, data) => {
        if(err){
          return cb(err.message);
        }
        const hosts = data ? JSON.parse(data) : [];
        return cb(hosts);
      })
    }else{
      return cb("no such storage file exists!");
    }
  }

  static displayHostByUsername(username, cb){
    const filePath = path.resolve(process.cwd(), ".data", "hosts.json");
    if(fs.existsSync(filePath)){
      fs.readFile(filePath, "utf-8", (err, data) => {
        if(err){
          return cb(err.message);
        }
        const hosts = data ? JSON.parse(data) : [];
        const hostByUsername = hosts.filter(host => host.username === username)[0];
        return cb(hostByUsername);
      })
    }else{
      return cb("no such storage file exists!");
    }
  }
}

export default Host;