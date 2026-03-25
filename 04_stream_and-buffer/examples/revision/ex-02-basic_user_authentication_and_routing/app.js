import http from "http";

import router from "./routes/router.js";

const PORT = 8080;
const HOST = "127.0.0.1";

const server = http.createServer(router);

server.listen(PORT, HOST, err => {
  if(err){
    console.error(`***unable to start the server, error: ${err.message}`);
  }else{
    console.log(`***server started at http://${HOST}:${PORT}`);
  }
})