import EventEmitter from "events";
import fs from "fs";
import path from "path";

const loginEmitter = new EventEmitter();
const fileName = "users.json";
const filePath = path.resolve("files", fileName);

loginEmitter.on("login", async (data) => {
  if (typeof data !== "object" || Object.keys(data).length === 0) {
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
  const user = users.find(usr => usr.username === data.username && usr.password === data.password);
  if (!user) {
    console.log("***no such user exists!");
    return false;
  } else {
    console.log("***log in successful!");
    return user;
  }
});

export default loginEmitter;
