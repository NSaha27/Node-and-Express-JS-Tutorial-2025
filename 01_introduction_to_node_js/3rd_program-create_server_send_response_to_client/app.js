import dotenv from "dotenv";
import http from "http";

dotenv.config();

const server = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify({message: "Welcome to the Node JS world dear!", dateTime: new Date().toUTCString()}));
});

server.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`server is running at http://${process.env.HOST}:${process.env.PORT}`);
})