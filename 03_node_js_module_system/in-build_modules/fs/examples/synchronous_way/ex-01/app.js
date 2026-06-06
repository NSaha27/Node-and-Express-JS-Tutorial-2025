// Handle file operation in synchronous way
const fs = require("fs");
const path = require("path");

/*
 fs.writeFileSync(filePath, data, option) - Write something to a file synchronously. If the file doesn't exist, it creates a new file, and if exists, it replaces the data in it with the new data.
 
 parameters:
 -----------
 1. filePath : the absolute path of the file
 2. data : the data to be written
 3. option : other options like encoding type, ex. - utf8, ascii, etc. 
*/

const fileName1 = "student.json";
const filePath1 = path.join(__dirname, "files", fileName1);

/*
const students = [
  {
    roll: 1,
    name: "Amit Sinha",
    class: 12,
    sec: "A",
    marks: {
      math: 92,
      physics: 97,
      chemistry: 94,
      biology: 92,
      bengali: 88,
      english: 95,
    },
  },
  {
    roll: 1,
    name: "Ritam Nath",
    class: 12,
    sec: "B",
    marks: {
      math: 93,
      physics: 95,
      chemistry: 92,
      biology: 90,
      bengali: 86,
      english: 91,
    },
  },
];

try{
  fs.writeFileSync(filePath1, JSON.stringify(students), "utf-8");
  console.log("*student data have been saved successfully!");
}catch(err){
  console.error("*failed to save the student data, error:", err.message);
}
*/

/*
  fs.readFileSync(filePath, option) - Synchronously reads the content of a file.

  parameters:
  -----------
  filePath : The absolute path of the file to read,
  option : Options like encoding type, ex. - "utf-8", "ascii", etc.
*/

/*
try{
  const students = fs.readFileSync(filePath1, "utf-8");
  if(typeof students !== "string"){
    throw new Error("*invalid data type!");
  }
  if(students.length === 0){
    throw new Error("*no student was found!");
  }
  console.log(JSON.parse(students));
}catch(err){
  console.error(err.message);
}
*/

/*
  fs.appendFileSync(filePath, data, option) - appends data synchronously to a file. If not exists, create a new file and writes data into it.

  parameters:
  -----------
  filePath : The absolute path of the file
  data : The data to be appended
  option : other options, like encoding, ex. - "utf-8", "ascii", etc.
*/

const fileName2 = "messages.txt";
const filePath2 = path.join(__dirname, "files", fileName2);
const message1 = {messenger: "Ipshita Dhar", message: "We're prepared to part away from this group"};
try{
  fs.writeFileSync(filePath2, message1.messenger.concat(" : ", message1.message, "\n"), "utf-8");
  console.log(`*the message of ${message1.messenger} has been recorded successfully!`);
}catch(err){
  console.error("*unable to write to the file, error:", err.message);
}

// append data synchronously
const message2 = {messenger: "Aniket Maity", message: "Ok, let's do it."};
try{
  fs.appendFileSync(filePath2, message2.messenger.concat(" : ", message2.message, "\n"), "utf-8");
  console.log(`*the message of ${message2.messenger} has been recorded successfully!`);
}catch(err){
  console.error("*unable to append this data to the file, error:", err.message);
}
