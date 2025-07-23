import conn from "../utils/dbConnection.js";

function generateBuildingRegdID() {
  const alp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = "1234567890";
  const alpNum = alp.concat(num);
  let regdID = "";
  while (regdID.length < 10) {
    regdID += alpNum[Math.floor(Math.random() * alpNum.length)];
  }
  return regdID;
}

class Accomodation {
  constructor(
    host,
    buildingName,
    buildingType,
    rent,
    buildingImages,
    contactNumber,
    addrBuildingNumber,
    addrRoad,
    addrTownVillage,
    addrDistrict,
    addrState,
    addrCountry,
    addrZipCode,
    rating = 3.5
  ) {
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

  async save() {
    const duplicateAccomodation =
      await Accomodation.findByUsernameBuildingNameAddrNumber(
        this.host,
        this.buildingName,
        this.addrBuildingNumber
      );
    if (duplicateAccomodation.length > 0) {
      return "*** a same accomodation with this name and address is already registered!";
    }
    try {
      // write sql query and execute it to save this accomodation into database
    } catch (err) {
      throw new Error(
        `*** unable to add the accomodation, error: ${err.message}`
      );
    }
  }

  static async fetchAll() {
    try {
      const sql = "SELECT * FROM accomodations";
      const [rows, fields] = conn.execute(sql);
      return rows.length > 0 ? rows : [];
    } catch (err) {
      throw new Error(
        `*** unable to fetch accomodations, error: ${err.message}`
      );
    }
  }

  static async findByUsernameBuildingNameAddrNumber(
    hostUsername,
    buildingName,
    addrBuildingNumber
  ) {
    if (hostUsername.length === 0) {
      return "*** please enter a valid username!";
    }
    try {
      const sql =
        "SELECT * FROM accomodations WHERE host = ?, buildingName = ?, addrBuildingNumber = ?";
      const values = [hostUsername, buildingName, addrBuildingNumber];
      const [rows, fields] = conn.execute(sql, values);
      return rows.length > 0 ? rows : [];
    } catch (err) {
      throw new Error(
        `*** unable to find the accomodation, error: ${err.message}`
      );
    }
  }

  static async findByHostUsername(hostUsername) {
    if (hostUsername.length === 0) {
      return "*** please enter a valid username!";
    }
    try {
      const sql = "SELECT * FROM accomodations WHERE host = ?";
      const values = [hostUsername];
      const [rows, fields] = conn.execute(sql, values);
      return rows.length > 0 ? rows : [];
    } catch (err) {
      throw new Error(
        `*** unable to find the accomodation, error: ${err.message}`
      );
    }
  }

  static async findByRegdID(regdID) {
    if (regdID.length === 0) {
      return "*** please enter a valid registration ID!";
    }
    try {
      const sql = "SELECT * FROM accomodations WHERE regdID = ?";
      const values = [regdID];
      const [rows, fields] = conn.execute(sql, values);
      return rows.length > 0 ? rows[0] : {};
    } catch (err) {
      throw new Error(
        `*** unable to find the accomodation, error: ${err.message}`
      );
    }
  }
}

export default Accomodation;
