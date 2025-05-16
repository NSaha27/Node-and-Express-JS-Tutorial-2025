/*
  path.dirname(path)
  --------------------

  This method returns the directories of a file path

*/

import path from "path";

const filePath = "D:/Node_JS_and_Express_JS/Express-JS-Projects-main/application_req_res_object/01_express_function/01_express_json/set_01/app.js";

const directories = path.dirname(filePath);

console.log(`Directories of the file path : "${directories}"`);

// example - 2
const filePath2 = "C:/Users/sahan/OneDrive/Pictures/Saved Pictures/greg-bulla-lKjX3S4pdog-unsplash.jpg";

const directories2 = path.dirname(filePath2);

console.log(`Directories of the above file path : "${directories2}"`);