import http from "http";

const HOST = "127.0.0.1";
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end("<h1>Good evening sir!</h1>");
});

server.listen(PORT, HOST, (err) => {
  if(!err){
    console.log(`server is running at http://${HOST}:${PORT}`);
  }else{
    console.error("unable to start the server, error:", err.message);
  }
})