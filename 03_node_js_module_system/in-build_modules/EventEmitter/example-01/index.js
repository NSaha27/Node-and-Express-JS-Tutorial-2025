const http = require("http");
const url = require("url");
const emitter = require("./handleSignupLoginout.js");

const server = http.createServer((req, res) => {
  const URL = req.url.split("?")[0];
  const method = req.method;

  if(URL === "/signup" && method === "GET"){
    res.setHeader("Content-Type", "text/html");
    res.write(`<!DOCTYPE html>
    <html>
      <head>
        <title>sign up</title>
      </head>
      <body>
        <h1>Sign up</h1>
        <p>*enter the following details</p>
        <p>
          <form action="/signup" method="POST">
            <p>
              <label for="username">Username</label><br/>
              <input type="text" name="username" id="username" />
            </p>
            <p>
              <label for="name">Name</label><br/>
              <input type="text" name="name" id="name" />
            </p>
            <p>
              <label for="email">Email ID</label><br/>
              <input type="email" name="email" id="email" />
            </p>
            <p>
              <label for="password">Password</label><br/>
              <input type="password" name="password" id="password" />
            </p>
            <p>
              <button type="submit">Sign Up</button>
            </p>
          </form>
        </p>
        <p>OR</p>
        <p>
          already registered? <a href="/login">Log In</a>
        </p>
      </body>
    </html>  
    `);
    res.end();
  }else if(URL === "/signup" && method === "POST"){
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      const parsedReqBody = Buffer.concat(chunks).toString("utf-8");
      const [parsedUsername, parsedName, parsedEmail, parsedPassword] = parsedReqBody.split("&");
      const username = parsedUsername.split("=")[1];
      const name = parsedName.split("=")[1];
      const email = parsedEmail.split("=")[1];
      const password = parsedPassword.split("=")[1];
      if(!username || !name || !email || !password){
        res.statusCode = 302;
        res.setHeader(
          "Location",
          `/signup?message=${encodeURIComponent("***all fields are required!")}`,
        );
        res.end();
        return;
      }
      const isSignUpDone = emitter.emit("user-signup", {username, name, email, password});
      if(isSignUpDone){
        res.statusCode = 302;
        res.setHeader(
          "Location",
          `/login?message=${encodeURIComponent("***sign up successful!")}`,
        );
        res.end();
        return;
      }else{
        res.statusCode = 302;
        res.setHeader(
          "Location",
          `/signup?message=${encodeURIComponent("***sign up failed!")}`,
        );
        res.end();
        return;
      }
    })
    req.on("error", (err) => {
      console.error(err.message);
      return;
    })
  }else if(URL === "/login" && method === "GET"){
    const parsedReqURL = url.parse(req.url, true);
    const message = parsedReqURL.query["message"] || "";
    res.setHeader("Content-Type", "text/html");
    res.write(`<!DOCTYPE html>
    <html>
      <head>
        <title>log in</title>
      </head>
      <body>
        ${(typeof message === "string" && message.length > 0) && `<div class=""><p>${message}</p></div>`}
        <h1>Log In</h1>
        <p>*enter the following details</p>
        <p>
          <form action="/login" method="POST">
            <p>
              <label for="username">Username</label><br/>
              <input type="text" name="username" id="username" />
            </p>
            <p>
              <label for="password">Password</label><br/>
              <input type="password" name="password" id="password" />
            </p>
            <p>
              <button type="submit">Log In</button>
            </p>
          </form>
        </p>
        <p>OR</p>
        <p>
          not registered yet? <a href="/signup">Sign Up</a>
        </p>
      </body>
    </html>  
    `);
    res.end();
  }else if(URL === "/login" && method === "POST"){
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      const parsedLoginData = Buffer.concat(chunks).toString("utf-8");
      const [parsedUsername, parsedPassword] = parsedLoginData.split("&");
      const username = parsedUsername.split("=")[1];
      const password = parsedPassword.split("=")[1];
      if(!username || !password){
        res.statusCode = 302;
        res.setHeader(
          "Location",
          `/login?message=${encodeURIComponent("***all fields are required!")}`,
        );
        res.end();
        return;
      }
      const isLoginDone = emitter.emit("user-login", username, password);
      if(!isLoginDone){
        res.statusCode = 302;
        res.setHeader(
          "Location",
          `/login?message=${encodeURIComponent("***log in failed!")}`,
        );
        res.end();
        return;
      }
      res.statusCode = 302;
      res.setHeader(
        "Location",
        `/home?username=${encodeURIComponent(username)}&message=${encodeURIComponent("***log in successful!")}`,
      );
      res.end();
      return;
    })
    req.on("error", (err) => {
      console.error(err.message);
      return;
    })
  }else if(URL === "/home" && method === "GET"){
    const parsedReqURL = url.parse(req.url, true);
    const {username, message} = parsedReqURL.query;
    res.setHeader("Content-Type", "text/html");
    res.write(`<!DOCTYPE html>
    <html>
      <head>
        <title>user home</title>
      </head>
      <body>
        <nav class="navbar">
          <h2><a href="/">Event Emitter</a></h2>
          <ul>
            <li><a href="/logout?username=${encodeURIComponent(username)}">Log Out</a></li>
          </ul>
        </nav>
        <main>
          ${(typeof message === "string" && message.length > 0) && `<div>
            <p>${message}</p>
          </div>`}
          <h1>User Home</h1>
        </main>
      </body>
    </html>`);
    res.end();
    return;
  }else if(URL === "/logout" && method === "GET"){
    const parsedReqURL = url.parse(req.url, true);
    const username = parsedReqURL.query["username"];
    const isLoggedOut = emitter.emit("user-logout", username);
    if(!isLoggedOut){
      res.statusCode = 302;
      res.setHeader("Location", `/home?message=${encodeURIComponent("***something went wrong, unable to log out!")}`);
      res.end();
      return;
    }
    res.statusCode = 302;
    res.setHeader("Location", `/login?message=${encodeURIComponent("***you're logged out successfully!")}`);
    res.end();
    return;
  }
});

const PORT = 3000;
server.listen(PORT, (err) => {
  if (err) {
    console.error("***unable to connect with the server, error:", err.message);
  } else {
    console.log("server started at port", PORT);
  }
});
