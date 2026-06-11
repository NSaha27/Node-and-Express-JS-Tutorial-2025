const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

const fileName = "user.json";
const filePath = path.join(__dirname, "files", fileName);

const signupEmitter = new EventEmitter();

signupEmitter.on("signup", async (signupDataObj) => {
  let users;
  try {
    const res = await fs.promises.readFile(filePath, "utf-8");
    users = (typeof res === "string" && res.length > 0) ? JSON.parse(res) : [];
  } catch (err) {
    console.error(err.message);
    return false;
  }
  if (
    typeof signupDataObj !== "object" ||
    Object.keys(signupDataObj).length === 0
  ) {
    console.error("***invalid signup data!");
    return false;
  }
  users.push(signupDataObj);
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(users), "utf-8");
    console.log("***user signup successful!");
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
});

module.exports = signupEmitter;