import conn from "../utils/dbConnection.js";

class Favourites{
  constructor(username, accRegdID){
    this.username = username;
    this.accRegdID = accRegdID;
  }

  async save(){
    const duplicateEntry = await Favourites.findByUsernameAccRegdID(this.username, this.accRegdID);
    if(Object.entries(duplicateEntry).length > 0){
      console.log(duplicateEntry);
      return "*** this accomodation is already present in your favourites list!";
    }
    try{
      const sql = "INSERT INTO favourites(client_username, accomodation_regdID) VALUES(?, ?)";
      const values = [this.username, this.accRegdID];
      const [result, fields] = await conn.execute(sql, values);
      return result ? true : false;
    }catch(err){
      throw new Error(`*** unable to add the accomodation in the favourites list, error: ${err.message}`);
    }
  }

  static async fetchAll(){
    try{
      const sql = "select  accomodations.regdID, accomodations.buildingName, accomodations.buildingType, accomodations.rent, accomodations.buildingImages, accomodations.contactNumber, accomodations.addrBuildingNumber, accomodations.addrRoad, accomodations.addrTownVillage, accomodations.addrDistrict, accomodations.addrState, accomodations.addrCountry, accomodations.addrZipCode, accomodations.rating from accomodations join favourites where accomodations.regdID=favourites.accomodation_regdID and favourites.client_username=?";
      const values = [Favourites.username,];
      const [rows, fields] = await conn.execute(sql, values);
      return rows.length > 0 ? rows : [];
    }catch(err){
      throw new Error(err.message);
    }
  }

  static async findByUsernameAccRegdID(username, accRegdID){
    try{
      if(username.length === 0){
        throw new Error("please enter a valid username!");
      }
      if(accRegdID.length === 0){
        throw new Error("please enter a valid accomodation registration ID!");
      }
      const sql = "SELECT * FROM favourites WHERE client_username=? AND accomodation_regdID=?";
      const values = [username, accRegdID];
      const [rows, fields] = await conn.execute(sql, values);
      return rows.length > 0 ? rows[0] : {};
    }catch(err){
      throw new Error(`*** unable to find the record, error: ${err.message}`);
    }
  }
}

export default Favourites;