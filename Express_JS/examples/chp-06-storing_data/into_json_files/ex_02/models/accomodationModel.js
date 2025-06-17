import fs from "fs";
import path from "path";

class Accomodation{
  constructor(accName, accOwner, accAddress, amenities, rent, contactNumber, contactEmail){
    this.accName = accName;
    this.accOwner = accOwner;
    this.accAddress = accAddress;
    this.amenities = amenities;
    this.rent = rent;
    this.contactNumber = contactNumber;
    this.contactEmail = contactEmail;
  }

  save(cb){
    const filePath = path.resolve(process.cwd(), ".data", "accomodations.json");
    if(fs.existsSync(filePath)){
      fs.readFile(filePath, "utf-8", (err, data) => {
        if(err){
          return cb(err.message);
        }
        const registeredAccomodations = data ? JSON.parse(data) : [];
        const accFoundAt = registeredAccomodations.findIndex(acc => acc.accName === this.accName && acc.accAddress === this.accAddress);
        if(accFoundAt !== -1){
          return cb("an accomodation with the same name and address is already registered in our portal!");
        }else{
          const newRegisteredAcc = [...registeredAccomodations, this];
          fs.writeFile(filePath, JSON.stringify(newRegisteredAcc), (err2) => {
            if(err2){
              return cb(err2.message);
            }
            return true;
          })
        }
      })
    }else{
      const data = [this,];
      fs.writeFile(filePath, JSON.stringify(data), err => {
        if(err){
          return cb(err.message);
        }
        return true;
      })
    }
  }

  static displayAccomodations(cb){
    const filePath = path.resolve(process.cwd(), ".data", "accomodations.json");
    if(fs.existsSync(filePath)){
      fs.readFile(filePath, "utf-8", (err, data) => {
        if(err){
          return cb(err.message);
        }
        const accomodations = data ? JSON.parse(data) : [];
        return cb(accomodations);
      })
    }else{
      return cb("no such file exists!");
    }
  }

  static displayAccByOwnerName(ownerName, cb){
    const filePath = path.resolve(process.cwd(), ".data", "accomodations.json");
    if(fs.existsSync(filePath)){
      fs.readFile(filePath, "utf-8", (err, data) => {
        if(err){
          return cb(err.message);
        }
        const accomodations = data ? JSON.parse(data) : [];
        const accByOwnerName = accomodations.filter(acc => acc.accOwner === ownerName);
        return cb(accByOwnerName);
      })
    }else{
      return cb("no such file exists!");
    }
  }

  static dispAccByAccOwnerName(accName, ownerName, cb){
    const filePath = path.resolve(process.cwd(), ".data", "accomodations.json");
    if(fs.existsSync(filePath)){
      fs.readFile(filePath, "utf-8", (err, data) => {
        if(err){
          return cb(err.message);
        }
        const accomodations = data ? JSON.parse(data) : [];
        const accByAccOwnerName = accomodations.filter(acc => acc.accName === accName && acc.accOwner === ownerName);
        return cb(accByAccOwnerName);
      })
    }else{
      return cb("no such file exists!");
    }
  }
}

export default Accomodation;