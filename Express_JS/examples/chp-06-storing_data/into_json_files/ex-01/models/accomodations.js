import fs from "fs";
import path from "path";

class Accomodation {
  constructor(buildingName, imageURL, location, amenities, price, rating){
    this.buildingName = buildingName;
    this.imageURL = imageURL;
    this.location = location;
    this.amenities = amenities;
    this.price = price;
    this.rating = rating;
  }

  save(){
    const filePath = path.resolve(process.cwd(), ".data", "accomodation.json");
    if(fs.existsSync(filePath)){
      fs.readFile(filePath, "utf-8", (err, data) => {
        if(err){
          throw new Error(err.message);
        }
        const accomodations = data ? JSON.parse(data) : [];
        const isAlreadyAdded = accomodations.includes(this);
        if(isAlreadyAdded){
          throw new Error("accomodation is already registered!");
        }
        const newAccomodationList = [...accomodations, this];
        fs.writeFile(filePath, JSON.stringify(newAccomodationList), (err2) => {
          if(err2){
            throw new Error(err2);
          }
          return true;
        })
      })
    }else{
      fs.writeFile(filePath, JSON.stringify(this), (err3) => {
        throw new Error(err3.message);
      })
      return true;
    }
  }

  static displayAccomodations(cb){
    const filePath = path.resolve(process.cwd(), ".data", "accomodation.json");
    if(fs.existsSync(filePath)){
      fs.readFile(filePath, "utf-8", (err, data) => {
        let accomodations = [];
        if(!err){
          accomodations = JSON.parse(data);
        }
        cb(accomodations);
      })
    }else{
      throw new Error("no such file exists!");
    }
  }
}

export default Accomodation;