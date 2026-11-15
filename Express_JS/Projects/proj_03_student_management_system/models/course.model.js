import {MongoServerError} from "mongodb";
import {getDB} from "../config/db.js";

class Course {
  constructor(id, title, category, fees){
    this.id = id;
    this.title = title;
    this.category = category;
    this.fees = fees;
  }
  async addCourse(){
    try{
      const db = getDB();
      const courseCollection = await db.collection("course");
      console.log("Course collection was created!");
      const courseFound = await courseCollection.findOne({_id: this.id, title: this.title});
      if(courseFound){
        return {message: "Course already added!"};
      }
      const result = courseCollection.insertOne({_id: this.id, title: this.title, category: this.category, fees: Number(this.fees)});
      if(!result){
        throw new Error("Unable to add the course")
      }
      return {message: "Success! Course added", courseId: result.insertId};
    }catch(err){
      if(err instanceof MongoServerError){
        console.error(err.message);
      }
      throw err;
    }
  }
  static async findCourse(id){
    if(typeof id !== "string" || id.length === 0){
      throw new Error("Invalid course Id!");
    }
    try{
      const db = getDB();
      const courseFound = await db.collection("course").findOne({_id: id});
      if(!courseFound){
        return {message: "No such course found!"};
      }
      return courseFound;
    }catch(err){
      if(err instanceof MongoServerError){
        console.error(err.message);
      }
      throw err;
    }
  }
}

export default Course;