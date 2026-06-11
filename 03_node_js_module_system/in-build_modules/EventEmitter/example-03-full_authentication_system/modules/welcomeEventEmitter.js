const EventEmitter = require("events");

const welcomeEmitter = new EventEmitter();

welcomeEmitter.on("welcome", (username) => {
  console.log(`***welcome back ${username}!`);
});

module.exports = welcomeEmitter;