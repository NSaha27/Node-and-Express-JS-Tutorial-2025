const fs = require("fs");
const path = require("path");

// create a file and write to it
// fs.writeFileSync()
const fileName = "users.json";
const filePath = path.join(__dirname, "files", fileName);
const data = [
  {
    name: "Niladri Saha",
    phone: "+918420530244",
    email: "niladri.saha31@gmail.com",
  },
  {
    name: "Anirban Bhattacharya",
    phone: "+917947825391",
    email: "anirban.bhattacharya35@gmail.com",
  },
];
try {
  fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");
  console.log("***data was successfully saved to the file!");
} catch (err) {
  console.error("***unable to write into the file, error:", err.message);
}

// read a file's content
// fs.readFileSync()
let users;
try {
  users = fs.readFileSync(filePath, "utf-8");
} catch (err) {
  console.error(`***unable to read the file, error: ${err.message}`);
}
if (users) {
  console.log(JSON.parse(users));
} else {
  console.log("***no user was found!");
}

// update a file's content
// fs.appendFileSync()
const fileName2 = "chat.json";
const filePath2 = path.join(__dirname, "files", fileName2);

const user1 = "Abhisek Das";
const user2 = "Tania Bhowmick";
const messages = [
  { user1, message: "Hello maam, what can I do for you?" },
  {
    user2,
    message:
      "Hello, I have a query relating to the product I recently purchased from your platform.",
  },
  { user1, message: "yes, tell me!" },
  { user2, message: "the product has a color-fade issue after the first wash" },
  {
    user1,
    message:
      "You have 7 days return policy, so you can return your product by that time",
  },
  { user1, message: "Can I help you do it?" },
  { user2, message: "yes, ofcourse!" },
  { user1, message: "Ok, I'm starting the return process now!" },
];

try {
  fs.writeFileSync(filePath2, JSON.stringify(messages[0]), "utf-8");
  console.log("***file has beeen created and first message was sent!");
} catch (err) {
  console.error("***unable to write to the file, error:", err.message);
}

for (let indx in messages) {
  if (indx === 0) continue;
  try {
    fs.appendFileSync(filePath2, JSON.stringify(messages[indx]), "utf-8");
  } catch (err) {
    console.error(
      `***unable to sent the message no. ${indx + 1}, error: ${err.message}`,
    );
    break;
  }
}

// update data of a file
const updatedUser = {
  name: "Niladri Saha",
  phone: "+918420803050",
  email: "niladri.saha32@gmail.com",
};

let users2;
try {
  users2 = fs.readFileSync(filePath, "utf-8");
} catch (err) {
  console.error(err.message);
}
if (users2) {
  users2 = JSON.parse(users2);
  const newUsers2 = users2.map((usr) => {
    if (usr.name === updatedUser.name) {
      return updatedUser;
    } else {
      return usr;
    }
  });
  try {
    fs.writeFileSync(filePath, JSON.stringify(newUsers2), "utf-8");
    console.log("***users list has been updated!");
  } catch (err) {
    console.error(err.message);
  }
} else {
  console.log("***no user has been found!");
}

// rename a file
const newFilePath2 = path.join(__dirname, "files", "customer_chats.json");
try {
  fs.renameSync(filePath2, newFilePath2);
  console.log("***the file was renamed successfully!");
} catch (err) {
  console.error("***unable to rename the file, error:", err.message);
}

// delete a file
const fileToDelete = path.join(__dirname, "files", "customer_chats.json");
try {
  fs.unlinkSync(fileToDelete);
  console.log("***the file was deleted successfully!");
} catch (err) {
  console.error("***unable to delete the file, error:", err.message);
}
