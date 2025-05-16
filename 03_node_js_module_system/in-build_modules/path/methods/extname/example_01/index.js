/*
  path.extname(path)
  --------------------

  This method returns the extension of a file from a file path and returns it as a string.

*/

import path from "path";

const filePath1 = "D:/Node_JS_and_Express_JS/Express-JS-Projects-main/application_req_res_object/01_express_function/01_express_json/set_01/app.js";

const ext1 = path.extname(filePath1);

console.log(`The extension of the file in the above file path is : ${ext1}`);

// example - 2
const filePath2 = "C:/Users/sahan/OneDrive/Pictures/Saved Pictures/greg-bulla-lKjX3S4pdog-unsplash.jpg";

const ext2 = path.extname(filePath2);

console.log(`The extension of the file is : ${ext2}`);

// combining the basename and extname, let's find the original file name without extension
const filePath3 = "C:/Users/sahan/OneDrive/Pictures/Saved Pictures/google01.jpg";

const filenameWithoutExt = path.basename(filePath3, path.extname(filePath3));

console.log(`The filename without extension is : "${filenameWithoutExt}"`);