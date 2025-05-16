/*
  path.join(segment_01, segment_02, segment_03, ...)
  ----------------------------------------------------

  This method joins path segments (given as parameters to it) together, then normalizes the path and returns it as a string.

  *it only takes strings as segment, otherwise it throws TypeError.
  *for a zero-length string, it returns "." i.e. the current root directory.
*/

import path from "path";

const path1 = path.join("node and express js", "node js", "node modules", "built-in modules", "path", "example_01", "index.js");

console.log(`The full path is : ${path1}`);

const path2 = path.join(process.cwd(), "index.js");

console.log(`The full path of our current working file : ${path2}`);