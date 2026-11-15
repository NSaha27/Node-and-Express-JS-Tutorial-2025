import {MongoServerError, ObjectId} from "mongodb";
import { getDB } from "../config/db.js";

class Student {
  constructor(name, dob, gender, qualification, phone, email, courseId, feesPayType, payMode, admissionTimestamp, batchId){
    this.name = name;
    this.dob = dob;
    this.gender = gender;
    this.qualification = qualification;
    this.phone = phone;
    this.email = email;
    this.courseId = courseId;
    this.feesPayType = feesPayType;
    this.payMode = payMode;
    this.admissionTimestamp = admissionTimestamp;
    this.batchId = batchId;
  }
  async addStudent(){
    // if(this.name.length === 0 || this.dob.length === 0 || this.gender.length === 0 || this.qualification.length === 0 || this.phone.length === 0 || this.email.length === 0 || this.courseId.length === 0 || this.feesPayType.length === 0 || this.payMode.length === 0 || this.admissionTimestamp.length === 0 || this.batchId.length === 0){
    //   return {message: "All fields are required!"};
    // }
    try{
      const db = getDB();
      const studentCollection = await db.collection("student");
      console.log("Student collection was created!");

      const studentFound = await studentCollection.findOne({name: this.name, phone: this.phone});
      if(Object.keys(studentFound).length === 0){
        return {message: "Student already exists!"};
      }

      const result = await studentCollection.insertOne({name: this.name, dob: this.dob, gender: this.gender, qualification: this.qualification, courseId: this.courseId, feesPayType: this.feesPayType, payMode: this.payMode, admissionTimestamp: this.admissionTimestamp, batchId: this.batchId});
      if(!result){
        throw new Error("Unable to add the student!");
      }
      return {message: "Success! Student details added", insertedId: result.insertedId};
    }catch(err){
      if(err instanceof MongoServerError){
        console.error(err.message);
      }
      throw err;
    }
  }
  static async findStudent(Id){
    if(!ObjectId.isValid(Id)){
      throw new Error("Invalid student Id!");
    }
    try{
      const studentFound = await db.collection("student").findOne({_id: new ObjectId(Id)});
      if(Object.keys(studentFound).length === 0){
        return {message: "No such student found!"};
      }
      return studentFound;
    }catch(err){
      if(err instanceof MongoServerError){
        console.error(err.message);
      }
      throw err;
    }
  }
}

export default Student;