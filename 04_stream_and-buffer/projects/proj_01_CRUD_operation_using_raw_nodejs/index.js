import http from "http";

import handleRoutes from "./routes/handleRoutes.js";

const environment = {
  staging: {
    port: 3000,
    env: "staging"
  },
  production: {
    port: 5000,
    env: "production"
  }
};

const PORT = environment[process.env.NODE_ENV]["port"];
const HOST = "127.0.0.1";



const server = http.createServer((req, res) => {
  handleRoutes.router(req, res);
});

server.listen(PORT, HOST, err => {
  if(!err){
    console.log(`server is running at http://${HOST}:${PORT}`);
  }else{
    console.error("unable to start the server!");
  }
})
