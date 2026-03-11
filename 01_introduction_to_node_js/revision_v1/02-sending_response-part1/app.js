// importing global modules
import http from "http";

const PORT = 3000;
const HOST = "127.0.0.1";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<!DOCTYPE html>");
  res.write("<html>");
  res.write("<head><title>Sending response</title></head>");
  res.write("<body>");
  res.write("<h1>Sending back response</h1>");
  res.write(`<button onclick="alert('Welcome back Mr. X, you have requested through a ${req.method} request!')">click to get the welcome message</button>`);
  res.write("</body>");
  res.write("</html>");
  res.end();
});

server.listen(PORT, HOST, (err) => {
  if(err){
    console.error(`unable to start the server, error: ${err.message}`);
  }else{
    console.log(`server started at http://${HOST}:${PORT}`);
  }
})