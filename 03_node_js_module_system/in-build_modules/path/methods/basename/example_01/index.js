/*
  path.basename(path, extension)
  -----------------

  This method returns the last part (i.e. the actual filename) of a path.

  If we pass the extension of the file as the second parameter, this method will return only the filename without the extension.

*/

import path from "path";

const p1 = "/Node_JS_and_Express_JS/Express-JS-Projects-main/application_req_res_object/01_express_function/01_express_json/set_01/app.js";

console.log(`The file name is "${path.basename(p1)}"`);

// filename without extension
const filenameWithoutExt = path.basename(p1, ".js");

console.log(`filename without extension is "${filenameWithoutExt}"`);