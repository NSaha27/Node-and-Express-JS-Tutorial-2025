/*
  writeFileSync(filePath, data, option) : writes data to a file in synchronous way (i.e. blocking the thread). Creates the file if it does not exist, or overwrites it if it exists.
  Note:
    1. filePath : the absolute path of the file (if want to create at another location) or the relative path.
    2. data : data to write into the file, can be in a string format or a buffer format.
    3. option : it can be any information about the file, ex. mode, flag, encoding type, etc.
*/

const fs = require("fs");
const path = require("path");

const fileName = "greetings.txt";
const filePath = path.join(__dirname, "files", fileName);

const greeting = "Hello sir/madam, have a nice day to you!";
try{
  fs.writeFileSync(filePath, greeting, "utf-8");
  console.log("greetings were sent! 😊");
}catch(err){
  console.error("unable to sent the greetings, error:", err.message);
}

// fs.appendFileSync(filePath, data, option)
const message1 = "\nWe have an offer for you, you've just got a 50% discount coupon. ";
const message2 = "\nUse the coupon 'FSS50' to avail the discount.";
try{
  fs.appendFileSync(filePath, message1.concat(message2), "utf-8");
  console.log("message(s) were sent! 😊");
}catch(err){
  console.error("unable to append data to the file, error:", err.message);
}