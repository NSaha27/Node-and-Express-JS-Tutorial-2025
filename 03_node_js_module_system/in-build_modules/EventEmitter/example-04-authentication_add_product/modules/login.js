const EventEmitter = require("events");
const fs = require("fs");
const path = require("path");
const cookie = require("cookie");

const loginEmitter = new EventEmitter();

const fileName = "customer.json";
const filePath = path.join(__dirname, "files", fileName);

loginEmitter.on("login", async (data) => {
  const parsedData = JSON.parse(data);
  let customers;
  try {
    const res = await fs.promises.readFile(filePath, "utf-8");
    customers = JSON.parse(res);
  } catch (err) {
    console.error(err.message);
    return false;
  }
  if (!customers) {
    console.error("***no customer was found!");
    return false;
  }
  const customerFound = customers.find(cust => cust.username === parsedData.username && cust.password === parsedData.password);
  if (!customerFound) {
    console.error("***invalid login credentials!");
    return false;
  }
  console.log("***login successful!");
  return JSON.stringify(customerFound.username);
})

module.exports = loginEmitter;

