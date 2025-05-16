import fs from "fs";
import http from "http";
import path from "path";

const HOST = "127.0.0.1";
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  fs.readFile(path.join(process.cwd(), "data/personal.json"), "utf-8", (err, data) => {
    if(err) {
      res.statusCode = 500;
      throw new Error("*failed to read the file, error:" + err.message);
    }
    const personalData = JSON.parse(data);
    res.statusCode = 200;
    res.end(`<!DOCTYPE html><html><head></head><body><main><div><table border='1' width='50%'><tr><th>Name</th><td>${personalData.name}</td></tr><tr><th>Place</th><td>${personalData.place}</td></tr><tr><th>Phone</th><td>${personalData.phone}</td></tr><tr><th>Email ID</th><td>${personalData.email}</td></tr></table></div></main></body></html>`);
  });
});

server.listen(PORT, HOST, (err) => {
  if(err) throw new Error("*failed to start the server, error:" + err.message);
  console.log(`server started at http://${HOST}:${PORT}`);
});