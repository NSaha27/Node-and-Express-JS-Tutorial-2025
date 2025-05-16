/*
  fs.open()
  ----------
  This method is used to open a file for reading or writing.

  fs.readFile()
  --------------
  This method is used to read the content of a file asynchronously
*/

import fs from "fs";

fs.open("../../../files/personalData.txt", "r+", (err, fd) => {
  if(err) throw new Error("*unable to open the file!");
  console.log(fd);
});