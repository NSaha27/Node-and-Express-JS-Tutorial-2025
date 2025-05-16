import fs from "fs";
import http from "http";
import path from "path";

const HOST = "127.0.0.1";
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const filePath = path.join(process.cwd(), "fileStorage/customer.json");
  const fileExists = fs.existsSync(filePath);
  if(!fileExists){
    res.writeHead(500, {"Content-Type": "text/html"});
    res.end("*file does not exist!");
    return false;
  }
  // rename the file
  fs.rename(filePath, path.join(process.cwd(), "fileStorage/customerInfo.json"), (err1) => {
    if(err1){
      res.writeHead(500, {"Content-Type": "text/html"});
      res.end("***unable to rename the file!");
      return false;
    }
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("***successfully renamed the file!");
  })

  /*
  // delete the file
  fs.unlink(filePath, (err2) => {
    if(err2){
      res.writeHead(500, {"Content-Type": "text/html"});
      res.end("*unable to delete the file, error: " + err2.message);
      return false;
    }
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("*file was deleted successfully!");
  })
  */
});

server.listen(PORT, HOST, (err) => {
  if(err){
    throw new Error(`unable to start the server, error: ${err.message}`);
  }
  console.log(`server is running at http://${HOST}:${PORT}`);
})