import {MongoClient} from "mongodb";

import env from "./validation.js";

const uri = env.DB_CONNECTING_STRING;
const dbName = env.DB_NAME;

const client = new MongoClient(uri);
let db;

async function connectDB(){
  try{
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    db = client.db(dbName);
    return db;
  }catch(err){
    console.error("Unable to connect with MongoDB, error: " + err.message);
    throw err;
  }
}

function getDB(){
  if(!db){
    throw new Error("Database is not connected yet!");
  }
  return db;
}

export { connectDB, getDB };
