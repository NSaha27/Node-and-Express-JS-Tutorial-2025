/*
  path.parse(pathString)
  ------------------------

  This method parses a path and returns a path object relating to it.
*/

import path from "path";

const path1 = path.join(process.cwd(), "index.js");

const path1Obj = path.parse(path1);

console.log(path1Obj);