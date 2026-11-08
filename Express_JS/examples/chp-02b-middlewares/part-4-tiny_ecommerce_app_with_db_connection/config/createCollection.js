import { getDB } from "./db.js";

async function createCollection(collectionName){
  try{
    const db = getDB();
    const collection = await db.createCollection(collectionName.toLowercase());
    console.log(`A ${collectionName} collection has been created!`);
    return collection;
  }catch(err){
    if(err.codeName === "NamespaceExists"){
      throw new Error(`${collectionName} collection already exists!`);
    }else{
      console.error(err.message);
      throw err;
    }
  }
}

export default createCollection;