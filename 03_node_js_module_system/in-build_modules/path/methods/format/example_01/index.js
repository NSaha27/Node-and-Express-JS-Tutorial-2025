/*
  path.format(pathObject)
  --------------------------

  This method takes a path obejct as its parameter and returns a full path string in respect of it.

  const pathObject = {
    dir: String,
    root: String,
    base: String,
    name: String,
    ext: String
  }
  
  Note: When dir is specified, root will be ignored, and name and ext will be ignored if base is specified.

  *this method is opposite of the path.parse() method

*/

import path from "path";

const pathObj1 = {
  root: "c:/node and express js tutorial/node js/modules/path/methods/format/example_01/",
  name: "index",
  ext: "js"
};

console.log(`the full path of our project's root file is : ${path.format(pathObj1)}`);

const pathObj2 = {
  dir: "c:/node and express js tutorial/node js",
  root: "node js/modules/path/methods/format/example_01",
  name: "index",
  ext: ".js"
};

console.log(`the full path of our 2nd project's root file is : ${path.format(pathObj2)}`);

const pathObj3 = {
  dir: "c:\\node and express js tutorial\\node js\\modules\\path\\methods\\format\\example_01",
  base: "index.js"
};

console.log(`the full path of our 3rd project's root file is : ${path.format(pathObj3)}`);

const pathObj4 = {
  dir: "c:\\node and express js tutorial\\node js\\modules\\path\\methods\\format\\example_01",
  name: "index",
  ext: ".js"
};

console.log(`the full path of our 4th project's root file is : ${path.format(pathObj4)}`);