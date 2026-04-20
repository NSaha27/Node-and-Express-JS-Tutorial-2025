const EventEmitter = require("events");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

// creating istance of the EventEmitter class
const emitter = new EventEmitter();

const filename = "users.json";
const filepath = path.join(__dirname, filename);

const loggedInUsersFilePath = path.join(__dirname, "loggedInUsers.txt");

emitter.on("user-login", async (username, password) => {
  let existingUsers;
  try {
    const data = await fs.promises.readFile(filepath, "utf-8");
    existingUsers = (typeof data === "string" && data.length > 0) ? JSON.parse(data) : [];
  } catch (err) {
    console.error(`***unable to read the file, error: ${err.message}`);
    return false;
  }
  const user = existingUsers.find(
    (user) => user.username === username
  );
  if (!user) {
    console.log("***invalid log in credentials!");
    return false;
  }else{
    const isPswMatched = await bcrypt.compare(password, user.password);
    if(!isPswMatched){
      console.log("***invalid log in credentials!");
      return false;
    }else{
      console.log("***log in successful!");
      try {
        await fs.promises.appendFile(loggedInUsersFilePath, `${username}\n`);
      } catch (err) {
        console.error(err.message);
      }
    }
  }
});

emitter.on("user-logout", async (username) => {
  let data;
  try {
    data = (await fs.promises.readFile(loggedInUsersFilePath, "utf-8")) || "";
  } catch (err) {
    console.error(err.message);
    return false;
  }
  let usernames = [];
  if (typeof data === "string" && data.length > 0) {
    usernames = data.split("\n");
  } else {
    console.error("***invalid data type!");
    return false;
  }
  const newUsernames = usernames.filter((uname) => uname !== username);
  try {
    await fs.promises.writeFile(loggedInUsersFilePath, newUsernames.join("\n"));
    console.log("***you're now logged out!");
  } catch (err) {
    console.error(err.message);
    return false;
  }
});

emitter.on("user-signup", async (newUser) => {
  if (typeof newUser !== "object") {
    console.log("***invalid user details!");
    return false;
  }
  let existingUsers;
  try {
    const data = await fs.promises.readFile(filepath, "utf-8");
    existingUsers = (typeof data === "string" && data.length > 0) ?
       JSON.parse(data) : [];
  } catch (err) {
    console.error("***unable to read the users.json file, error:", err.message);
    return false;
  }
  const user = existingUsers.find(
    (usr) => usr.username === newUser.username && usr.email === newUser.email,
  );
  if (user) {
    console.log("***you're already registered!");
    return false;
  } else {
    const newUserObj = {...newUser, password: await bcrypt.hash(newUser.password, 10)};
    const newUserList = [...existingUsers, newUserObj];
    try {
      await fs.promises.writeFile(filepath, JSON.stringify(newUserList));
      console.log("***sign up successful!");
      return true;
    } catch (err) {
      console.error(
        "***unable to save the data to users.json file, error:",
        err.message,
      );
      return false;
    }
  }
});

module.exports = emitter;
