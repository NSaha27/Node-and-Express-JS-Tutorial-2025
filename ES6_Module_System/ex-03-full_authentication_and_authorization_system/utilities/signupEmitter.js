import EventEmitter from "events";
import fs from "fs";
import path from "path";

const fileName = "users.json";
const filePath = path.resolve("files", fileName);

const signupEmitter = new EventEmitter();

signupEmitter.on("signup", async (data) => {
  if (Object.keys(data).length === 0) {
    console.error("***invalid signup data!");
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
  const user = users.find(usr => usr.username === data.username && usr.phone === data.phone);
  if (user) {
    console.log("***user already present!");
    return false;
  }
  users.push(data);
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(users), "utf-8");
    console.log("***user has been registered!");
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
});

export default signupEmitter;