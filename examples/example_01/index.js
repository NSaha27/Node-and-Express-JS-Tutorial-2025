import dotenv from "dotenv";
import fs from "fs";
import http from "http";
import path from "path";

dotenv.config();

function loadPages(filename, res){
  const stream = fs.createReadStream(path.join(process.cwd(), `views/${filename}`));
  stream.on("error", (err) => {
    throw new Error("*file doesn't exist!");
  });
  stream.pipe(res);
}

const server = http.createServer((req, res) => {
  try{
    switch(req.url){
      case '/':
        loadPages("index.html", res);
        break;
      case '/add-user':
        if(req.method === 'POST'){
          let userData = [];
          req.on("data", (chunk) => {
            userData.push(chunk);
          });
          req.on("end", () => {
            // validate user data, but I'm not doing it right now

            // --- process 1 to convert a Buffer to a string in utf-8 encoding form
            // const decoder = new TextDecoder("utf-8");
            // userData = decoder.decode(Buffer.concat(userData));
            // console.log(userData);

            // --- process 2 to convert a Buffer to a string in utf-8 encoding form
            userData = Buffer.concat(userData).toString("utf-8") + "\n";
            
            // append new user to the file
            if(fs.existsSync(path.resolve(process.cwd(), "file_storage", "user.txt"))){
              fs.appendFile(path.resolve(process.cwd(), "file_storage", "user.txt"), userData, (err) => {
                if(err){
                  throw new Error("*unable to append user data to the file, error: " + err.message);
                }
                console.log("*user added successfully!");
                res.writeHead(403, {"location": "/"});
                res.end();
              })
            }
          })
        }
        break;
      default:
        loadPages("404.html", res);
    }
  }catch(e){
    console.error(e.message);
  }
});

server.listen(process.env.PORT, process.env.HOST, (err) => {
  if(err){
    console.error(`unable to start the server, error: ${err.message}`);
  }else{
    console.log(`server is running at http://${process.env.HOST}:${process.env.PORT}`);
  }
})