/*
  path.isAbsolute(pathString)
  -----------------------------

  This method returns true if the path is an absolute path, otherwise, it returns false.

  *for a zero-length path string, it returns false.
*/
import path from "path";

const path1 = "example_01\\";
const path2 = "c:\\node and express js tutorial\\node js\\modules\\path\\methods\\format\\example_01\\index.js";

console.log(`is path 1 is an absolute path : ${path.isAbsolute(path1)}`);
console.log(`is path 2 is an absolute path : ${path.isAbsolute(path2)}`);
