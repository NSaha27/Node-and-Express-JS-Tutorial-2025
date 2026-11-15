import {MongoServerError} from "mongodb";
import { getDB } from "../config/db";

class Batch{
  constructor(id, name, createdFor=null, createdOn=new Date().toLocaleDateString()){
    this.id = id;
    this.name = name;
    this.createdFor = createdFor;
    this.createdOn = createdOn;
  }
  async createBatch(){
    try{
      const db = getDB();
      const batchCollection = await db.collection("batch");
      console.log("Batch collection is created!");
      
      const batchFound = await batchCollection.findOne({ _id: this.id });
      if(batchFound){
        return {message: "Another batch with the same ID already created!"};
      }
      const result = await batchCollection.insertOne({_id: this.id, name: this.name, createdFor: this.createdFor, createdOn: this.createdOn});
      if(!result){
        throw new Error("Unable to create the batch!");
      }
      return {message: "A batch has been created!", batchId: result.insertId};
    }catch(err){
      if(err instanceof MongoServerError){
        console.error(err.message);
      }
      throw err;
    }
  }
  static async findBatch(id){
    if(typeof id !== "string" || id.length === 0){
      throw new Error("Invalid batch Id!");
    }
    try{
      const db = getDB();
      const batchFound = await db.collection("batch").findOne({_id: id});
      if(!batchFound){
        return {message: "No such batch found!"};
      }
      return batchFound;
    }catch(err){
      if(err instanceof MongoServerError){
        console.error(err.message);
      }
      throw err;
    }
  }
}

export default Batch;