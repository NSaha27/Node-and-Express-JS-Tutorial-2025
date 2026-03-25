import http from "http";

import router from "./routes.js";

const PORT = 3000;
const HOST = "127.0.0.1";

const server = http.createServer(router);

server.listen(PORT, HOST, (err) => {
  if(err){
    console.error("***unable to start the server, error:", err.message);
  }else{
    console.log(`server has been started at http://${HOST}:${PORT}`);
  }
})