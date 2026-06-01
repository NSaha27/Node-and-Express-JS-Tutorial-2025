/*
// window or document objects are not available in Node JS
console.log(window); // will throw a reference error
console.log(document); // will throw a reference error
*/

/*
// global and globalThis object
console.log(global);
console.log(globalThis); // same as global object in Node environment
*/

// reach out to the properties and methods of global object

/*
// work with timer related methods
const timer = global.setInterval(() => {
  const date = new Date();
  console.log(date.toLocaleTimeString());
}, 1000);

global.setTimeout(() => {
  global.clearInterval(timer);
}, 60000);
*/

// working with fetch method
global.fetch("https://dummyjson.com/products?limit=5")
  .then(res => res.json())
  .then(products => {
    console.log(products);
  })
  .catch(err => {
    console.error(err.message);
  })