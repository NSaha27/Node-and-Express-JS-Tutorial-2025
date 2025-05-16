// external modules
import dotenv from "dotenv";
import http from "http";

// internal modules
import env from "./helpers/handleEnvVariables.js";
import handler from "./helpers/handleReqRes.js";

dotenv.config();

// module scaffolding
const app = {};

app.config = {
  host: "127.0.0.1",
};

app.handleReqRes = handler.handleReqRes;

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(env.currentEnvVar.port, app.config.host, (err) => {
    if(!err){
      console.log(`server is running at http://${app.config.host}:${env.currentEnvVar.port}`);
    }else{
      console.error(`unable to start the server, error: ${err.message}`);
    }
  })
}

app.createServer();
