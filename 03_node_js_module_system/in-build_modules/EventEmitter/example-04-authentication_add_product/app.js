const http = require("http");
const cookie = require("cookie");

const signupEmitter = require("./modules/signup");
const loginEmitter = require("./modules/login");
const addProductEmitter = require("./modules/addProduct");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;

  if (url === "/signup" && method === "POST") {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    })
    req.on("end", () => {
      const seller = Buffer.concat(chunks).toString();
      const isSignedUp = signupEmitter.emit("signup", seller);
      if (isSignedUp) {
        res.write("***sign up successful!");
      } else {
        res.write("***sign up failed!");
      }
      return res.end();
    })
  } else if (url === "/login" && method === "POST") {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    })
    req.on("end", () => {
      const loginData = Buffer.concat(chunks).toString();
      const loggedInUser = loginEmitter.emit("login", loginData);
      if (loggedInUser) {
        res.write("***log in successful!");
        res.setHeader("Set-Cookie",
          cookie.stringifySetCookie({
            name: "loggedInUser",
            value: loggedInUser,
            httpOnly: true,
            maxAge: 60 * 60 * 2
          })
        )
      } else {
        res.write("***log in failed!");
      }
      return res.end();
    })
  } else if (url === "/add-product" && method === "POST") {
    const cookies = cookie.parseCookie(req.headers.cookie || "");
    const loggedInUser = cookies["loggedInUser"];
    if (!loggedInUser) {
      res.write("***please log in at first!");
      return res.end();
    }
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    })
    req.on("end", () => {
      const product = Buffer.concat(chunks).toString();
      const isProdAdded = addProductEmitter.emit("add-product", product);
      if (!isProdAdded) {
        res.write("***unable to add the product!");
      } else {
        res.write("***the product has been added successfully!");
      }
      return res.end();
    })
  } else if (url === "/" && method === "GET") {
    res.statusCode = 200;
    res.write("Welcome to product seller app!");
    res.end();
  }
});

server.listen(PORT, HOST, (err) => {
  if (err) {
    console.error("*unable to start the server, error:", err.message);
    return false;
  }
  console.log(`*server started at http://${HOST}:${PORT}`);

})