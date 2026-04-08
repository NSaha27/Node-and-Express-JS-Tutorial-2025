const http = require("http");
const emitter = require("./handleSignupLoginout.js");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
});

const PORT = 3000;
server.listen(PORT, (err) => {
  if (err) {
    console.error("***unable to connect with the server, error:", err.message);
  } else {
    console.log("server started at port", PORT);
  }
});
