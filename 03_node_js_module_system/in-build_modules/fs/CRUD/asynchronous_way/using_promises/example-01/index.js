const fs = require("fs");
const path = require("path");

const data = [
  {
    ssn: "472572509143",
    name: "Arnab Roy",
    phone: "+917947820532",
    email: "arnab.roy27@gmail.com",
  },
  {
    ssn: "756290518401",
    name: "Palash Kar",
    phone: "+919830624890",
    email: "palash.kar07@gmail.com",
  },
  {
    ssn: "420872584092",
    name: "Manas Majhi",
    phone: "+919831100922",
    email: "manas.majhi028@gmail.com",
  },
];
// fs.promises.writeFile()
const fileName1 = "users.json";
const filePath1 = path.join(__dirname, "files", fileName1);

fs.promises
  .writeFile(filePath1, JSON.stringify(data), "utf-8")
  .then(() => {
    console.log("***data was successfully written!");
  })
  .catch((er) => {
    console.error("***unable to write to the file, error:", er.message);
  });

// fs.promises.readFile()
fs.promises
  .readFile(filePath1, "utf-8")
  .then((res) => JSON.parse(res))
  .then((users) => console.log(users))
  .catch((err) =>
    console.error(`***unable to read the file, error: ${err.message}`),
  );

// fs.promises.appendFile()
const fileName2 = "feedback.txt";
const filePath2 = path.join(__dirname, "files", fileName2);

const feedbacks = `customer: Niladri Saha\nrating: 4.2\nfeedback: Very good product\n\ncustomer: Abinash Palit\nrating: 4\nfeedback: Very soothing effect\n\ncustomer: Manish Aggarwal\nrating: 4.4\nfeedback: Bohot accha product hay, perfect fittings bhi hay\n\n`;

fs.promises
  .writeFile(filePath2, feedbacks, "utf-8")
  .then(() => console.log("***feedbacks were saved!"))
  .catch((err) =>
    console.error(`***unable to save the feedbacks, error: ${err.message}`),
  );

const newFeedback1 =
  "customer: Tuhin Banerjee\nrating: 3.8\nfeedback: Not bad!\n\n";
fs.promises
  .appendFile(filePath2, newFeedback1, "utf-8")
  .then(() => console.log("***new feedback added!"))
  .catch((err) =>
    console.error(`***unable to add the feedback, error: ${err.message}!`),
  );

// fs.promises.unlink()
fs.promises
  .unlink(filePath2)
  .then(() => console.log("***the file was successfully deleted!"))
  .catch((err) =>
    console.error(`***unable to delete the file, error: ${err.message}!`),
  );
