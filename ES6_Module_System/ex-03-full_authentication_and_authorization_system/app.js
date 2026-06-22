import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if ()
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

server.listen(PORT, HOST, (err) => {
  if (err) {
    console.error("***unable to start the server, error:", err.message);
    return false;
  }
  console.log(`***server was started at http://${HOST}:${PORT}`);
})