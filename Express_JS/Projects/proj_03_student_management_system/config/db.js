import {MongoClient} from "mongodb";

const client = new MongoClient(process.env.MONGODB_CONNECTING_STRING, {monitorCommands: true});

let db;
const connectDB = async () => {
  try{
    await client.connect();
    console.log("Success: Database connection established!");
    db = client.db("student_management_db_part01");
  }catch(err){
    throw err;
  }
};

const getDB = () => {
  return db ? db : new Error("Failed: Database not connected!");
}

export {connectDB, getDB};