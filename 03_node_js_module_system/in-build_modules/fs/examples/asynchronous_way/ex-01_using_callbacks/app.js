// FILE HANDLING IN ASYNCHRONOUS WAY
const fs = require("fs");
const path = require("path");

/*
  fs.writeFile(filePath, data, option, callback) - writes data to a file in asynchronous way, create a new file if doesn't exist, or replace the data with the new data, if the file exists.

  parameters : 
  1. filePath : the absolute path of the file to write,
  2. data : The data to be written in the file,
  3. option : any other option, like encoding, ex. "utf-8", "ascii", "hex", etc.
  4. callback : the callback function to be called if file writing is done
*/
const fileName1 = "customers.txt";
const filePath1 = path.join(__dirname, "files", fileName1);

const customer1 = `cid : 12345\nname : Ajay Srivastava\ndish : Masala Dosha\nqty : ${3}\ngross_amount (Rs.) : ${240.00}\ndiscount (5%) : (-)${12.00}\ngst (12%) : ${27.00}\ntotal_amount (Rs.) : ${255.00}\n\n`;

fs.writeFile(filePath1, customer1, "utf-8", (err) => {
  if(err){
    console.error("*unable to write to the file, error:", err.message);
  }else{
    console.log("*the bill amount has been recorded successfully!");
  }
});

/*
  fs.readFile(filePath, option, callback) - reads data from a file asynchronously and returns it.

  paramters :
  1. filePath : The absolute path of the file to read
  2. option : other options to format the result, like encoding, ex. - "utf-8", "ascii", "hex", etc.
  3. callback : This is the function to be called when the file read operation would be done, it returns either an error or the data of the file.
*/
fs.readFile(filePath1, "utf-8", (err, data) => {
  if(err){
    console.error(`*failed to read the file, error: ${err.message}`);
    return false;
  }
  console.log(data);
});

/*
  fs.appendFile(filePath, data, option, callback) - append a data to a file asynchronously. If the file doesn't exist, it creates a new file at first, then appends the new data into it.

  Paramters :
  1. filePath : the absolute path of the file,
  2. data : The data to append,
  3. option : Other options like encoding, ex. "utf-8", "ascii", "hex", etc.
  4. callback : The callback function to be called when the append operation is over
*/

const customer2 = `cid : 14012\nname : Nilakshi Yadav\ndish : Badsahi Paratha, Mattar Paneer\nqty : ${6} + ${2}\ngross_amount (Rs.) : ${120.0} + ${160.0}\ndiscount (5%) : (-)${14.0}\ngst (12%) : ${32.0}\ntotal_amount (Rs.) : ${298.0}\n\n`;

fs.appendFile(filePath1, customer2, "utf-8", (err) => {
  if(err){
    console.error("*failed to append the new bill amount, error:", err.message);
    return false;
  }
  console.log("*the new bill amount has been recorded successfully!");
})

/*
  fs.unlink(filePath, callback) - Deletes a file asynchronously

  Parameter :
  1. filePath : The absolute path of the file to be deleted
  2. callback : The callback function to be called when the delete operation is completed or failed
*/
fs.unlink(filePath1, (err) => {
  if(err){
    console.error("*failed to delete the file, error:", err.message);
    return false;
  }
  console.log("*the file has been deleted successfully!");
})