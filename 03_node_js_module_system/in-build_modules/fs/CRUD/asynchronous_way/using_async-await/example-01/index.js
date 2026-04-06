const fs = require("fs");
const path = require("path");

// handling file operation using async-await
const fileName1 = "feedback.txt";
const filePath1 = path.join(__dirname, "files", fileName1);

const writeFileAsync = async (filepath, data, encryption = "utf-8") => {
  try {
    await fs.promises.writeFile(filepath, data, encryption);
    console.log("***feedback was saved successfully!");
  } catch (err) {
    console.error(`***unable to write to the file, error: ${err.message}`);
  }
};

const feedback1 = {
  username: "Niladri Saha",
  feedback: "excellent shirt, very good in color and size is perfectly fitted",
};

const data = `username: ${feedback1.username}\nfeedback: ${feedback1.feedback}\n\n`;
writeFileAsync(filePath1, data, "utf-8");

// reading a file asynchronously using async-await
const readFileAsync = async () => {
  try {
    const data = await fs.promises.readFile(filePath1, "utf-8");
    if (typeof data === "string" && data.length > 0) {
      console.log(data);
    } else {
      console.log("***the file is empty!");
    }
  } catch (err) {
    console.error(`***unable to read the file, error: ${err.message}`);
  }
};

readFileAsync();

// append data to a file in asynchronous way using async-await
const feedbacks = [
  {
    username: "Kunaljit Sarkar",
    feedback: "this shirt is very good, fittings is ok",
  },
  {
    username: "Diljit Singh",
    feedback:
      "nice shirt, color is same as that in the image, special thanks to flipkert for delivering it on time.",
  },
];
const appendFileAsync = async (data) => {
  try {
    await fs.promises.appendFile(filePath1, data, "utf-8");
    console.log("***data append to the file successfully!");
  } catch (err) {
    console.error(
      `***unable to append data to the file, error: ${err.message}`,
    );
  }
};
for (let feedback of feedbacks) {
  const feedback2 = `username: ${feedback.username}\nfeedback: ${feedback.feedback}\n\n`;
  appendFileAsync(feedback2);
}

// delete a file in asynchronous way
const deleteFileAsync = async (filepath) => {
  try {
    await fs.promises.unlink(filepath);
    console.log("***the file was successfully deleted!");
  } catch (err) {
    console.error(`***unable to delete the file, error: ${err.message}`);
  }
};
deleteFileAsync(filePath1);
