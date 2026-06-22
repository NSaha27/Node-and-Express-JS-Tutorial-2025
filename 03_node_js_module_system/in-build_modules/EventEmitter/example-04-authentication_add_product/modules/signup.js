const EventEmitter = require("events");
const fs = require("fs");
const path = require("path");

const signupEmitter = new EventEmitter();

const fileName = "customer.json";
const filePath = path.join(__dirname, "files", fileName);

signupEmitter.on("signup", async (data) => {
  const parsedData = JSON.parse(data);
  let customers;
  try {
    const res = await fs.promises.readFile(filePath, "utf-8");
    customers = JSON.parse(res);
    const custFoundAt = customers.findIndex(cust => cust.username === parsedData.username && cust.phone === parsedData.phone);
    if (custFoundAt !== -1) {
      throw new Error("*customer already exists!");
    }
  } catch (err) {
    console.error(err.message);
    return false;
  }
  customers.push(parsedData);
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(customers), "utf-8");
    console.log("*sign up successful!");
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
});

module.exports = signupEmitter;