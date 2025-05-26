import http from "http";

const PORT = process.env.NODE_ENV === "staging" ? 5000 : 3000;
const HOST = process.env.HOST || "127.0.0.1";

const server = http.createServer((req, res) => {
  debugger;
  function calculateArea(width, height) {
    return width + height;
  }

  let width = 10;
  let height = 5;

  if(area > 100){
    console.log("the area is large!");
  }else{
    console.log("the area is small!");
  }

  if(width + height > 100){
    console.log("area is greater than or equal to 100");
    
  }
});

server.listen(PORT, HOST, err => {
  if(err){
    console.error("unable to start the server!");
  }else{
    console.log(`server is running at http://${HOST}:${PORT}`);
  }
})
