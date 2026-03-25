/*
  global and globalThis objects
  ------------------------------

  Just like the "window" object in the browser environment, Node.js also has a global object called "global". But the global object does not have any facility to work with DOM or BOM, it doesn't have "document" object to access and manipulate DOM elements. However, it has many common functions that of the window object.
  - In ECMAScript 2020, a global module has been introduced named "globalThis", it changes the object inside it according to the JavaScript environment we are working on. For example, in the browser environment it works similar to the "window" object, and in the Node.js environment it works similar to the "global" object. 
*/

// console.log(global);
console.log(globalThis);