// external dependencies
import { StringDecoder } from "string_decoder";
import url from "url";

// internal dependencies
import lib from "../lib/saveData.js";
import routes from "../routes.js";

// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
  // parsing requested url
  const pathURL = url.parse(req.url, true);
  const pathname = pathURL.pathname;
  const trimmedPathname = pathname.replace(/^\/+|\/+$/g , "");
  const queryString = pathURL.query;
  const headers = req.headers;
  const method = req.method.toLowerCase();
  const requestProperties = {
    pathURL,
    trimmedPathname,
    queryString,
    headers,
    method
  };

  const chosenHandler = routes[trimmedPathname] ? routes[trimmedPathname] : routes["404"];


  let requestBody = "";
  if(method === "post"){
    const decoder = new StringDecoder("utf-8");
    req.on("data", (buffer) => {
      requestBody += decoder.write(buffer);      
    });
    req.on("end", () => {
      requestBody += decoder.end();
      chosenHandler(requestProperties, (resStatus, resPayload) => {
        const status = typeof(resStatus) === "number" ? resStatus : 500;
        const payload = typeof(resPayload) === "object" ? resPayload : {};
        const payloadString = JSON.stringify(requestBody);
        res.writeHead(status);
        lib.create(payloadString, (msg) => {
          res.end(msg);
        })
      })
    });
  }else if(method === "get" && queryString.username){
    chosenHandler(requestProperties, (resStatus, resPayload) => {
      const status = typeof(resStatus) === "number" ? resStatus : 500;
      const payload = typeof(resPayload) === "object" ? resPayload : {};
      const payloadString = JSON.stringify(payload);
      res.writeHead(status);
      queryString.username === "admin" ? lib.readMultiple((msg) => res.end(msg)) : lib.readOne(queryString.username, (msg) => res.end(msg));
    })
  }else if(method === "get"){
    chosenHandler(requestProperties, (resStatus, resPayload) => {
      const status = typeof(resStatus) === "number" ? resStatus : 500;
      const payload = typeof(resPayload) === "object" ? resPayload : {};
      const payloadString = JSON.stringify(payload);
      res.writeHead(status);
      res.end(payloadString);
    })
  }else if(method === "put"){
    requestBody = "";
    const decoder = new StringDecoder("utf-8");
    req.on("data", (buffer) => {
      requestBody += decoder.write(buffer);
    });
    req.on("end", () => {
      requestBody += decoder.end();
      chosenHandler(requestProperties, (resStatus, resPayload) => {
        const status = typeof(resStatus) === "number" ? resStatus : 500;
        const payload = typeof(resPayload) === "object" ? resPayload : {};
        const payloadString = JSON.stringify(requestBody);
        res.writeHead(status);
        lib.update(payloadString, (msg) => {
          res.end(msg);
        })
      })
    })
  }else if(method === "delete" && queryString.username){
    const username = queryString.username.toUpperCase();
    chosenHandler(requestProperties, (resStatus, resPayload) => {
      const status = typeof(resStatus) === "number" ? resStatus : 500;
      const payload = typeof(resPayload) === "object" ? resPayload : {};
      const payloadString = JSON.stringify(payload);
      res.writeHead(status);
      lib.delete(username, (msg) => {
        res.end(msg);
      })
    })
  }
};

export default handler;