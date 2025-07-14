import fs from "node:fs/promises";
import path from "node:path";

function generateBuildingRegdID(){
  const alp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = "1234567890";
  const alpNum = alp.concat(num);
  let regdID = "";
  while(regdID.length < 10){
    regdID += alpNum[Math.floor(Math.random() * alpNum.length)];
  }
  return regdID;
}

class Accomodation{
  constructor(host, buildingName, buildingType, rent, buildingImages, contactNumber, addrBuildingNumber, addrRoad, addrTownVillage, addrDistrict, addrState, addrCountry, addrZipCode, rating = 3.5){
    this.regdID = "#" + generateBuildingRegdID();
    this.host = host;
    this.buildingName = buildingName;
    this.buildingType = buildingType;
    this.rent = rent;
    this.buildingImages = buildingImages;
    this.contactNumber = contactNumber;
    this.addrBuildingNumber = addrBuildingNumber;
    this.addrRoad = addrRoad;
    this.addrTownVillage = addrTownVillage;
    this.addrDistrict = addrDistrict;
    this.addrState = addrState;
    this.addrCountry = addrCountry;
    this.addrZipCode = addrZipCode;
    this.rating = rating;
  }

  static getFilePath(){
    return path.resolve(process.cwd(), "data", "accomodation.json");
  }

  async save(){
    const filePath = Accomodation.getFilePath();
    let prevAccomodations = [];

    try{
      const data = await fs.readFile(filePath, "utf-8");
      prevAccomodations = data ? JSON.parse(data) : [];
    }catch(err){
      if(err.code !== "ENOENT"){
        throw new Error(`*** could not read accomodation file, error: ${err.message}!`);
      }
    }

    const duplicateEntry = prevAccomodations.find(acc => acc.buildingName === this.buildingName && acc.contactNumber === this.contactNumber);

    if(duplicateEntry){
      return "*** a similar accomodation is already registered at our portal!";
    }

    prevAccomodations.push(this);

    try{
      await fs.mkdir(path.dirname(filePath), {recursive: true});
      await fs.writeFile(filePath, JSON.stringify(prevAccomodations, null, 2));
      return true;
    }catch(err2){
      throw new Error(`*** couldn't write accomodation file, error: ${err2.message}!`);
    }
  }

  static async findAllAccomodations(){
    const filePath = Accomodation.getFilePath();
    try{
      let data = await fs.readFile(filePath, "utf-8");
      const accomodations = JSON.parse(data);
      return accomodations.length > 0 ? accomodations : [];
    }catch(err){
      if(err.code === "ENOENT"){
        return "*** no accomodation file was found!";
      }
      throw new Error(`*** couldn't read accomodation file, error: ${err.message}!`);
    }
  }

  static async findAccomodationsOfAHost(host){
    const allAccomodations = await Accomodation.findAllAccomodations();
    if(allAccomodations.length > 0){
      const foundAccomodations = allAccomodations.filter(acc => acc.host === host);
      return foundAccomodations.length > 0 ? foundAccomodations : "*** this host has not registered any accomodation yet!";
    }
    return "*** no accomodation is yet registered at our portal!";
  }

  static async findAccomodationByRegdID(regdID){
    const allAccomodations = await Accomodation.findAllAccomodations();
    if(allAccomodations.length > 0){
      const accomodationFound = allAccomodations.filter(acc => acc.regdID === regdID);
      return accomodationFound.length > 0 ? accomodationFound[0] : "*** no such accomodation with this registration id was found!";
    }
    return "*** no accomodation is yet registered at our portal!";
  }
}

export default Accomodation;