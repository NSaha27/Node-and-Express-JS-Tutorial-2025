const http = require("http");

const signupEmitter = require("./modules/signupEventEmitter.js");
const loginEmitter = require("./modules/loginEventEmitter.js");
const welcomeEmitter = require("./modules/welcomeEventEmitter.js");

const user1 = {
  username: "NILADRISAHA",
  name: "Niladri Saha",
  phone: "+918420520344",
  email: "niladri.saha31@example.com",
  password: "Niladri@12345"
};

const loginUser1 = {
  username: "NILADRISAHA",
  password: "Niladri@12345"
};

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;

  if(url === "/signup" && method === "POST"){
    const result = signupEmitter.emit("signup", user1);
    return res.end(result ? "***user sign up successful" : "***user sign up failed!");
  }else if(url === "/login" && method === "POST"){
    const result = loginEmitter.emit("login", loginUser1);
    if(result){
      res.statusCode = 302;
      res.setHeader("Location", "/welcome");
      return res.end("***log in successful!");
    }
    return res.end("***log in failed!");
  }else if(url === "/welcome" && method === "GET"){
    welcomeEmitter.emit("welcome", loginUser1.username);
    return res.end(`***welcome back ${loginUser1.username}!`);
  }
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
server.listen(PORT, HOST, (err) => {
  if(err){
    console.error(err.message);
    return false;
  }
  console.log(`server started at http://${HOST}:${PORT}`);
})