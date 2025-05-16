import http from "http";

// creating our first server
const server = http.createServer((req, res) => {
  // console.log(req);
  console.log(req.headers);
});

const HOST = "127.0.0.1";
const PORT = "3000";

server.listen(PORT, HOST, (err) => {
  if(err){
    throw new Error("*failed to start the server, error" + err.message);
  }
  console.log(`server has been started at http://${HOST}:${PORT}`);
})