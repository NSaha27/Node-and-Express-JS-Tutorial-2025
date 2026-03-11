// global modules
import http from "http";

// other utility variables
const PORT = 3000;
const HOST = "127.0.0.1";

// create server
const server = http.createServer((req, res) => {
  console.log("The requested URL is:", req.url);
  console.log("The request method is:", req.method);
  process.exit();
});

server.listen(PORT, HOST, (err) => {
  if(err){
    console.error("*unable to listen to user requests, error:", err.message);
  }else{
    console.log(`server started at http://${HOST}:${PORT}`);
  }
});