import Cookie from "cookies";
import url from "url";

import handleReqRes from '../helpers/handleReqRes.js';


// module scaffolding
const handleRoutes = {};

handleRoutes.router = function(req, res){
  const reqMethod = req.method.toLowerCase();
  const reqURL = req.url.toLowerCase();
  const parsedURL = url.parse(reqURL, true);
  const pathname = parsedURL.pathname;
  // const queryString = parsedURL.query;

  if(reqMethod === "get" && pathname === "/mens"){
    handleReqRes.loadMensPage(req, res, result => {
      if(result){
        res.writeHead(302, result, {"Location": "/404"});
        return res.end();
      }
    })
  }

  if(reqMethod === "get" && pathname === "/womens"){
    handleReqRes.loadWomensPage(req, res, (result) => {
      if(result){
        res.writeHead(302, result, {"Location": "/404"});
        return res.end();
      }
    })
  }

  if(reqMethod === "get" && pathname === "/kids"){
    handleReqRes.loadKidsPage(req, res, (result) => {
      if(result){
        res.writeHead(302, result, {"Location": "/404"});
        return res.end();
      }
    })
  }

  if(reqMethod === "get" && pathname === "/signup"){
    handleReqRes.loadSignupPage(req, res, (result) => {
      if(result){
        res.writeHead(302, result, {"Location": "/404"});
        return res.end();
      }
    })
  }

  if(reqMethod === "post" && pathname === "/signup"){
    handleReqRes.signup(req, res, (result) => {
      if(result){
        res.statusCode = 302;
        res.setHeader("error", result);
        res.setHeader("Location", "/signup");
        return res.end();
      }else{
        res.statusCode = 302;
        res.setHeader("message", "registration successful, please log in now!");
        res.setHeader("Location", "/login");
        return res.end();
      }
    })
  }

  if(reqMethod === "get" && pathname === "/login"){
    handleReqRes.loadLoginPage(req, res, (result) => {
      if(result){
        res.writeHead(302, result, {"Location": "/404"});
        return res.end();
      }
    })
  }

  if(reqMethod === "post" && pathname === "/login"){
    handleReqRes.login(req, res, (result) => {
      if(result){
        res.statusCode = 302;
        res.setHeader("error", result);
        res.setHeader("Location", "/login");
        return res.end();
      }else{
        res.statusCode = 302;
        res.setHeader("message", "login successful, welcome to customer home page!");
        res.setHeader("Location", "/customer-home");
        return res.end();
      }
    })
  }

  if(reqMethod === "get" && pathname === "/customer-home"){
    const cookie = new Cookie(req, res);
    if(!cookie.get("username")){
      res.statusCode = 302;
      res.setHeader("error", "please log in at first!");
      res.setHeader("Location", "/login");
      return res.end();
    }
    handleReqRes.loadCustHomePage(req, res, (result) => {
      if(result){
        res.writeHead(302, result, {"Location": "/404"});
        return res.end();
      }
    })
  }

  if(reqMethod === "get" && pathname === "/customer-account"){
    const cookie = new Cookie(req, res);
    const username = cookie.get("username");
    if(!username){
      res.statusCode = 302;
      res.setHeader("error", "please log in at first!");
      res.setHeader("Location", "/login");
      return res.end();
    }else{
      handleReqRes.getCustByUsername(req, res, username, (result) => {
        if(typeof result === "object"){
          const customer = result;
          const pageDetails = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Customer Account</title>
  </head>
  <body>
    <header>
      <nav>
        <h2>Myntra</h2>
        <ul>
          <li><a href="/" class="">Home</a></li>
          <li><a href="/mens" class="active">Mens</a></li>
          <li><a href="/womens" class="">Womens</a></li>
          <li><a href="/kids" class="">Kids</a></li>
          <li><a href="/customer-home" class="active">Customer home</a></li>
          <li><a href="/logout" class="">log Out</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section>
        <h1>Customer account</h1>
        <div class="update-form">
          <form action="/update-customer-account" method="post">
            <p>
              <label for="username">Username</label><br />
              <input
                type="text"
                name="username"
                id="username"
                value="${customer.username}" readonly
              />
            </p>
            <p>
              <label for="name">Name</label><br />
              <input type="text" name="name" id="name" value="${customer.name}" />
            </p>
            <p>
              <label for="address">Address</label><br />
              <textarea name="address" id="address" rows="7" value="${customer.address}"></textarea>
            </p>
            <p>
              <label for="phone">Phone</label><br />
              <input type="text" name="phone" id="phone" value="${customer.phone}" />
            </p>
            <p>
              <label for="email">Email ID</label><br />
              <input type="email" name="email" id="email" value="${customer.email}" />
            </p>
            <p>
              <label for="password">Password</label><br />
              <input
                type="password"
                name="password"
                id="password"
                value="${customer.password}"
              />
            </p>
            <p>
              <button type="submit">Update</button>
              <button type="reset">Cancel</button>
            </p>
          </form>
        </div>
      </section>
    </main>
  </body>
</html>
`;
          res.write(pageDetails);
          return res.end();
        }else{
          res.statusCode = 302;
          res.setHeader("error", result);
          res.setheader("Location", "/login");
          return res.end();
        }
      })
    }
  }

  if(reqMethod === "post" && pathname === "/update-customer-account"){
    handleReqRes.updateCustomer(req, res, (result) => {
      if(result){
        res.statusCode = 302;
        res.setHeader("error", result);
        res.setHeader("Location", "/customer-account");
        return res.end();
      }else{
        res.statusCode = 302;
        res.setHeader("message", "customer account was successfully updated!");
        res.setHeader("Location", "/customer-account");
        return res.end();
      }
    })
  }

  if(reqMethod === "get" && pathname === "/cart"){
    const cookie = new Cookie(req, res);
    const username = cookie.get("username");
    if(!username){
      res.statusCode = 302;
      res.setHeader("error", "please log in at first!");
      res.setHeader("Location", "/login");
      return res.end();
    }else{
      handleReqRes.loadCartPage(req, res, (result) => {
        if(result){
          res.writeHead(302, result, {"Location": "/404"});
          return res.end();
        }
      })
    }
  }

  if(reqMethod === "get" && pathname === "/logout"){
    handleReqRes.logout(req, res, result => {
      if(result){
        res.statusCode = 302;
        res.setHeader("error", result);
        res.setHeader("Location", "/customer-account");
        return res.end();
      }else{
        res.statusCode = 302;
        res.setHeader("message", "you're now logged out!");
        res.setHeader("Location", "/login");
        return res.end();
      }
    })
  }

  if(reqMethod === "get" && pathname === "/404"){
    handleReqRes.load404Page(req, res, (result) => {
      if(result){
        throw new Error(result);
      }
    })
  }

  if(reqMethod === "get" && pathname === "/"){
    handleReqRes.loadHomePage(req, res, (result) => {
      if(result){
        res.writeHead(302, result, {"Location": "/404"});
        return res.end();
      }
    })
  }
};

export default handleRoutes;
