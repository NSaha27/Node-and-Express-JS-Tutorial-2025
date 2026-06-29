"use strict"

import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getFileContent = (filename) => {
  const filePath = path.resolve("files", filename);
  rl.question("\nEnter file content: ", async (content) => {
    if (content.length === 0) {
      console.error("***file content must be provided!");
      return getFileContent(filename);
    }
    const fileExtension = path.extname(filePath);
    if(fileExtension === ".json"){
      try{
        const parsed = JSON.parse(content);
        if(typeof parsed !== "object" || Object.keys(parsed).length === 0){
          throw new Error("***invalid JSON data!");
        }
      }catch(err){
        console.error(err.message);
        return getFileContent(filename);
      }
    }
    try{
      await fs.promises.writeFile(filePath, content, "utf-8");
      console.log("***the file was created and content were added!");
    }catch(err){
      console.error("***unable to create the file, error:", err.message);
    }
    return fileCreator();
  });
}

const handleOption = (option) => {
  if(isNaN(Number(option))){
    console.error("***invalid data type!");
    return fileCreator();
  }
  if(option === "5"){
    console.log("***thank you, visit again...");
    rl.close();
    return false;
  }
  rl.question("\nEnter file name: ", (fname) => {
    if(fname.length === 0){
      console.error("***file name cannot be blank!");
      return handleOption(option);
    }
    let fileBaseName;
    switch(Number(option)){
      case 1:
        fileBaseName = fname + ".txt";
        getFileContent(fileBaseName);
        break;
      case 2:
        fileBaseName = fname + ".docx";
        getFileContent(fileBaseName);
        break;
      case 3:
        fileBaseName = fname + ".rtf";
        getFileContent(fileBaseName);
        break;
      case 4:
        fileBaseName = fname + ".json";
        getFileContent(fileBaseName);
        break;
      default:
        console.error("***invalid option!");
        return fileCreator();
    }

  })
}

const fileCreator = () => {
  console.log("\nFile Creator App:");
  console.log("choose the file type: ");
  console.log("1: .txt file");
  console.log("2: .doc or .docx file");
  console.log("3: .rtf file");
  console.log("4: .json file");
  console.log("5: exit from the program");
  rl.question("Enter the option: ", handleOption);
};

fileCreator();