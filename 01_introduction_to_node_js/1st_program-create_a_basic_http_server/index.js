// import external modules
import http from "http";

// creating server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hurrey! this is the first Node JS program");
});

// starting the server on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("server is running at http://127.0.0.1:3000");
})