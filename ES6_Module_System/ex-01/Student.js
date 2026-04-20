import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

class Student{
  constructor(ssn, name, sex, address, phone, email, password){
    this.ssn = ssn;
    this.name = name;
    this.sex = sex;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.password = password
  }
  static #getPath(){
    const fileName = "student.json";
    const filePath = path.join("./public", fileName);
    return filePath; 
  }
  async saveStudent(){
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(this.password, salt);
    const newStudent = {ssn: this.ssn, name: this.name, sex: this.sex, address: this.address, phone: this.phone, email: this.email, password: encryptedPassword};
    let existingStudents;
    try{
      const data = await fs.promises.readFile(Student.#getPath(), "utf-8");
      existingStudents = data ? JSON.parse(data) : [];
    }catch(err){
      throw err;
    }
    const studentFound = existingStudents.find(stu => stu.ssn === newStudent.ssn);
    if(studentFound){
      throw new Error("***there is an another student with the same ssn number already present!");
    }
    existingStudents.push(newStudent);
    try{
      fs.promises.writeFile(Student.#getPath(), JSON.stringify(existingStudents));
      console.log("***the new student was added successfully!");
      return true;
    }catch(err){
      throw err;
    }
  }
  static async findStudent(ssn) {
    let existingStudents;
    try{
      const data = await fs.promises.readFile(Student.#getPath(), "utf-8");
      existingStudents = data ? JSON.parse(data) : [];
    }catch(err){
      throw err;
    }
    const studentFound = existingStudents.find(stu => stu.ssn === ssn);
    if(!studentFound){
      throw new Error("*** invalid username or SSN!");
    }
    return studentFound;
  }
  static async updateAStudent(updatedData) {
    if(!updatedData instanceof Object){
      throw new Error("*** invalid data type, the updated data must be an object!");
    }
    let existingStudents;
    try{
      const data = await fs.promises.readFile(Student.#getPath(), "utf-8");
      existingStudents = data ? JSON.parse(data) : [];
    }catch(err){
      throw err;
    }
    const studentFound = existingStudents.find(stu => stu.ssn === updatedData.ssn);
    if(!studentFound){
      throw new Error("*** no such student is found!");
    }else {
      existingStudents = existingStudents.map(async stu => {
        if(stu.ssn === updatedData.ssn){
          const saltRounds = 10;
          const salt = await bcrypt.genSalt(saltRounds);
          const updatedDataWithPswHashed = {...updatedData, password: await bcrypt.hash(updatedData.password, salt)};
          return updatedDataWithPswHashed;
        }else{
          return stu;
        }
      });
    }
    try{
      await fs.promises.writeFile(Student.#getPath(), JSON.stringify(existingStudents));
      console.log("*** we've updated the student info!");
      return true;
    }catch(err){
      throw err;
    }
  }
  static async deleteAStudent(ssn) {
    let existingStudents;
    try{
      const data = await fs.promises.readFile(Student.#getPath(), "utf-8");
      existingStudents = data ? JSON.parse(data) : [];
    }catch(err){
      throw err;
    }
    const studentFound = existingStudents.find(stu => stu.ssn === ssn);
    if(!studentFound){
      throw new Error("*** no such student was found!");
    }
    const newStudentList = existingStudents.filter(stu => stu.ssn !== ssn);
    try{
      await fs.promises.writeFile(Student.#getPath(), JSON.stringify(newStudentList));
      console.log(`*** the student with the ssn "${ssn}" has been deleted!`);
      return true;
    }catch(err){
      throw err;
    }
  }
}

export default Student;