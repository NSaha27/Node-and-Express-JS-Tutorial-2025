import dotenv from "dotenv";
import fs from "fs";
import http from "http";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;

const server = http.createServer((req, res) => {
  const rs = fs.createReadStream(path.resolve(process.cwd(), "views", "index.html"));
  const ws = fs.createWriteStream(path.resolve(process.cwd(), "file_storage", "products.txt"));
  if(req.url === "/" && req.method === "GET"){
    rs.on("error", (err) => {
      if(err) throw new Error("***unable to load the page!");
    })
    rs.pipe(res);
  }else if(req.url === "/" && req.method === "POST"){
    // req.on("data", (chunk) => {
    //   ws.write(chunk, (err) => {
    //     if(err) throw new Error("***unable to save the product data!");
    //   })
    //   console.log("***products details were saved successfully!");
    //   // res.writeHead(403, {"location": "/"});
    // });

    // --- or ---

    req.pipe(ws);
    res.end("***products details were saved successfully!");
  }else{
    const ers = fs.createReadStream(path.resolve(process.cwd(), "views", "404.html"));
    ers.on("error", (err) => {
      if(err) throw new Error("***unable to load the 404 page!");
    })
    ers.pipe(res);
  }
});

server.listen(PORT, HOST, (err) => {
  if(err){
    console.error(`***unable to run the server, error: ${err.message}`);
  }else{
    console.log(`***server is running at http://${HOST}:${PORT}`);
  }
})