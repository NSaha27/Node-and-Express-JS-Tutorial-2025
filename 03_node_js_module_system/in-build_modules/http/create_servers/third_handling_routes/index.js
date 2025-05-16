import dotenv from "dotenv";
import fs from "fs";
import http from "http";
import path from "path";

dotenv.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const server = http.createServer((req, res) => {
  let stream = null;
  switch(req.url){
    case "/":
      stream = fs.createReadStream(path.join(process.cwd(), "dist/index.html"));
      stream.on("error", (err) => {
        res.writeHead(404, {"content-type": "text/html"});
        res.write(err.message);
        res.end();
      })
      stream.pipe(res);
      break;
    case "/about":
      stream = fs.createReadStream(path.join(process.cwd(), "dist/about.html"));
      stream.on("error", (err) => {
        res.writeHead(404, {"content-type": "text/html"});
        res.write(err.message);
        res.end();
      });
      stream.pipe(res);
      break;
    case "/contact":
      stream = fs.createReadStream(path.join(process.cwd(), "dist/contact.html"));
      stream.on("error", (err) => {
        res.writeHead(404, {"content-type": "text/html"});
        res.write(err.message);
        res.end();
      });
      stream.pipe(res);
      break;
    default:
      stream = fs.createReadStream(path.join(process.cwd(), "dist/404.html"));
      stream.on("error", (err) => {
        res.writeHead(404, {"content-type": "text/html"});
        res.write(err.message);
        res.end();
      });
      stream.pipe(res);
  }
});

server.listen(PORT, HOST, (err) => {
  if(err){
    console.error("unable to start the server, error: " + err.message);
  }else{
    console.log(`server is running at http://${HOST}:${PORT}`);
  }
})
