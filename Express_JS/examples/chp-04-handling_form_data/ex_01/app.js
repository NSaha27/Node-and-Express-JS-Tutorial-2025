// core modules

// external modules
import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";

// local modules

const app = express();

dotenv.config();

const host = process.env.HOST || "127.0.0.1";
const port = process.env.NODE_ENV === "development" ? 3000 : 5000;

app.use(bodyParser.urlencoded({extends: true}));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send(`<header class="header">
    <nav class="navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="/" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a href="/news" class="nav-link">News</a>
        </li>
        <li class="nav-item">
          <a href="/login" class="nav-link">Register/Log In</a>
        </li>
      </ul>
    </nav>
  </header>
  <main class="main">
    <section class="sec" id="sec1">
      <h1 class="page-title">Home page</h1>
    </section>
  </main>
  `)
});

app.get("/news", (req, res, next) => {
  res.send(`<header class="header">
    <nav class="navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="/" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a href="/news" class="nav-link">News</a>
        </li>
        <li class="nav-item">
          <a href="/login" class="nav-link">Register/Log In</a>
        </li>
      </ul>
    </nav>
  </header>
  <main class="main">
    <section class="sec" id="sec1">
      <h1 class="page-title">News page</h1>
    </section>
  </main>
  `)
});

app.get("/login", (req, res, next) => {
  res.send(`<header class="header">
    <nav class="navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="/" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a href="/news" class="nav-link">News</a>
        </li>
        <li class="nav-item">
          <a href="/login" class="nav-link">Register/Log In</a>
        </li>
      </ul>
    </nav>
  </header>
  <main class="main">
    <section class="sec" id="sec1">
      <h1 class="page-title">log In page</h1>
      <h3 class="">Enter the following details to log into our portal</h3>
      <div class="">
        <form action="/login" method="POST">
          <p>
            <label for="username">Username</label> <br/>
            <input type="text" name="username" id="username">
          </p>
          <p>
            <label for="password">Password</label> <br/>
            <input type="password" name="password" id="password">
          </p>
          <p>
            <input type="submit" name="submit" value="Log In">
            <input type="reset" value="Cancel">
          </p>
        </form>
      </div>
      <div>
        <h4>OR</h4>
        <p>
          not yet registered? <a href="/register">Register</a>
        </p>
      </div>
    </section>
  </main>
  `)
})

app.post("/login", (req, res, next) => {
  const reqBody = req.body;
  console.log(reqBody);
  res.send("wait for log in!");
})

app.get("/register", (req, res, next) => {
  res.send(`<header class="header">
    <nav class="navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="/" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a href="/news" class="nav-link">News</a>
        </li>
        <li class="nav-item">
          <a href="/login" class="nav-link">Register/Log In</a>
        </li>
      </ul>
    </nav>
  </header>
  <main class="main">
    <section class="sec" id="sec1">
      <h1 class="page-title">log In page</h1>
      <h3 class="">Enter the following details to register at our portal</h3>
      <div class="">
        <form action="/login" method="POST">
          <p>
            <label for="username">Username</label> <br/>
            <input type="text" name="username" id="username">
          </p>
          <p>
            <label for="name">Name</label> <br/>
            <input type="text" name="name" id="name">
          </p>
          <p>
            <label for="address">Address</label> <br/>
            <textarea name="address" id="address" rows="7" cols="30"></textarea>
          </p>
          <p>
            <label for="phone">Phone</label> <br/>
            <input type="text" name="phone" id="phone">
          </p>
          <p>
            <label for="email">Email ID</label> <br/>
            <input type="email" name="email" id="email">
          </p>
          <p>
            <label for="password">Password</label> <br/>
            <input type="password" name="password" id="password">
          </p>
          <p>
            <input type="submit" name="submit" value="Register">
            <input type="reset" value="Cancel">
          </p>
        </form>
      </div>
      <div>
        <h4>OR</h4>
        <p>
          already registered? <a href="/login">log In</a>
        </p>
      </div>
    </section>
  </main>
  `)
});

app.post("/register", (req, res, next) => {
  const reqBody = req.body;
  console.log(reqBody);
  res.send("wait for registration!");
})

app.listen(port, host, err => {
  if(!err){
    console.log(`server is running at http://${host}:${port}`);
  }else{
    console.error("sorry, unable to start the server!");
  }
})