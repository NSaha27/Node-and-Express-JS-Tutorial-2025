// import EventEmitter class
const EventEmitter = require("events");

// create an instance of this class
const emitter = new EventEmitter();

// define an event
emitter.on("greet", (args) => {
  console.log(`Hello ${args.sex === "male" || args.sex === "Male" || args.sex === "M" || args.sex === "m" ? "Mr." : "Ms."}${args.username}, welcome to our website ${args.website}!`);
});

// trigger or emit the event that was defined
emitter.emit("greet", {username: "Tista Dutta", sex: "female", website: "nilstutorial.edu.in"});