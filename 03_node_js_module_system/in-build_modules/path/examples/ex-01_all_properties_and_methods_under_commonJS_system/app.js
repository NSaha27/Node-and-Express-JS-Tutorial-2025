const path = require("path");

// get the absolute directory path of a file
console.log(__dirname);

// get the absolute file path
console.log(__filename);

// join path segments into an absolute path of a file (path seperator will automatically be set based on the OS we're using)
const joinPath = path.join("school", "students", "7th_standard", "student7.json");
console.log(joinPath);

const filepath2 = "D:\\Node_JS_and_Express_JS\\Node-and-Express-JS-Tutorial-2025\\03_node_js_module_system\\in-build_modules\\path\\examples\\ex-01_all_properties_and_methods_under_commonJS_system\\files\\user.json";

// full directory path of a given file
const fileDirName = path.dirname(filepath2);
console.log(fileDirName);

// relative path of a given file
const fileName = path.basename(filepath2);
console.log(fileName);

// extension of a given file 
const fileExt = path.extname(filepath2);
console.log(fileExt);

// resolve a path of a given file
const pathResolved = path.resolve("files", "school", "stuffs", "office", "stuff_office.json");
console.log(pathResolved);

// parse a file path
const parsedPath = path.parse(filepath2);
console.log(parsedPath);