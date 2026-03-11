// import global modules
import http from "http";

const PORT = 3000;
const HOST = "127.0.0.1";

const server = http.createServer((req, res) => {
  const apiURL = "https://jsonplaceholder.typicode.com/posts?limit=10";
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    })
    .catch(err => {
      console.error("unable to fetch posts, error:", err.message);
      res.end();
    })
});

server.listen(PORT, HOST, (err) => {
  if(err){
    console.error("unable to start the server, error:", err.message);
  }else{
    console.log(`server started at http://${HOST}:${PORT}`);
  }
})