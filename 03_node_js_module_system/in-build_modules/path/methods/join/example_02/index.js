const path = require("path");

// absolute path of the current project directory
console.log(__dirname);

// absolute path of the current project file
console.log(__filename);

// path.join() - used to join multiple path segments and returns an absolute file path
const filePath = path.join("school", "main", "student", "10", "students.json");
console.log(filePath);

// path.extname() - returns the extension of a given file name from a file path
const extname = path.extname(filePath);

// path.basename() - returns the last part of a path (mainly the name of the file with extension)
const basename = path.basename(filePath);

// path.dirname() - returns the directory part of a path where a file exists
const dirname = path.dirname(filePath);

// path.parse() - returns an object containing all the details of a file path, ex. - root, dir, base, ext, and name
const parse = path.parse(filePath);

console.log({parse, dirname, basename, extname});

// path.resolve() = resolves a sequence of path into an absolute path, starting from the current directory
const resolve = path.resolve(filePath);
console.log(resolve);

// path.format() - takes a path object and creates an absolute path from it
const newPathObj = {
  root: '',
  dir: 'employee\\development\\p-fst102',
  base: 'reports.txt',
  ext: '.txt',
  name: 'reports'
};
const newPath = path.format(newPathObj);
console.log(newPath);

const filePath2 = path.join("courses", "web-development", "mern", "full-stack-web-development-with-mern.pdf");
console.log(filePath2);

const dirname2 = path.dirname(filePath2);
console.log(dirname2);

const basename2 = path.basename(filePath2);
console.log(basename2);

const extname2 = path.extname(filePath2);
console.log(extname2);

const resolve2 = path.resolve(filePath2);
console.log(resolve2);

const parse2 = path.parse(filePath2);

console.log({parse2, dirname2, basename2, extname2, resolve2});

const pathObj2 = {
  root: "",
  dir: "courses\\data-science\\google-data-science-program",
  base: "google-data-science-professional-certificate.pdf",
  ext: ".pdf",
  name: "google-data-science-professional-certificate",
};
const newPath2 = path.format(pathObj2);
console.log(newPath2);