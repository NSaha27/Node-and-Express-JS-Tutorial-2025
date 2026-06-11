const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

const fileName = "user.json";
const filePath = path.join(__dirname, "files", fileName);

const loginEmitter = new EventEmitter();

loginEmitter.on("login", async (loginDataObj) => {
  if (
    typeof loginDataObj !== "object" ||
    Object.keys(loginDataObj).length === 0
  ) {
    console.error("***invalid login data!");
    return false;
  }
  let users;
  try {
    const res = await fs.promises.readFile(filePath, "utf-8");
    users = res.length > 0 ? JSON.parse(res) : [];
  } catch (err) {
    console.error(err.message);
    return false;
  }
  if(users.length === 0){
    console.error("***no user was found!");
    return false;
  }
  const userFoundAt = users.findIndex(usr => usr.username === loginDataObj.username && usr.password === loginDataObj.password);
  if(userFoundAt !== -1){
    console.log("***login successful!");
    return true;
  }
});

module.exports = loginEmitter;
