import fs from "fs";
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
  save(cb){
    const filePath = path.resolve(process.cwd(), ".data", "hosts.json");
    if(fs.existsSync(filePath)){
      fs.readFile(filePath, "utf-8", (err, data) => {
        if(err){
          return cb(err.message);
        }
        const registeredHosts = data ? JSON.parse(data) : [];
        const hostFoundAt = registeredHosts.findIndex(host => host.ssn === this.ssn && host.phone === this.phone);
        if(hostFoundAt !== -1){
          return cb("host with the same ssn and phone number is already registered!");
        }else{
          const newRegisteredHosts = [...registeredHosts, this];
          fs.writeFile(filePath, JSON.stringify(newRegisteredHosts), (err2) => {
            if(err2){
              return cb(err2.message);
            }
            return true;
          })
        }
      })
    }else{
      const data = [this,];
      fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if(err){
          return cb(err.message);
        }
        return true;
      })
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