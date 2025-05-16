import http from "http";
import dispDateTime from "./dateTime.js";

const HOST = "127.0.0.1";
const PORT = 3000;

const server = http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(`The current date and time is: ${dispDateTime().toLocaleString()}`);
  res.end();
});

server.listen(PORT, HOST, (err) => {
  if(!err){
    console.log(`server is running at http://${HOST}:${PORT}`);
  }else{
    console.log("something went wrong, unable to start the server!");
  }
});
