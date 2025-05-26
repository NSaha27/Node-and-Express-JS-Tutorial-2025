const routes = {
  loadHomePage: function(req, res, next){
    const method = req.method.toLowerCase();
    if(method === "get"){
      return res.send("<h1>Welcome to the Home page!</h1>");
    }
    res.send("<h1>404 not found!</h1>");
  },
  loadAboutUsPage: function(req, res, next){
    const method = req.method.toLowerCase();
    if(method === "get"){
      return res.send("<h1>Welcome to the About Us page!</h1>");
    }
    res.send("<h1>404 not found!</h1>");
  },
  loadBlogPage: function(req, res, next){
    const method = req.method.toLowerCase();
    if(method === "get"){
      return res.send("<h1>Welcome to the Blog page!</h1>");
    }
    res.send("<h1>404 not found!</h1>");
  },
  loadRegisterPage: function(req, res, next){
    const method = req.method.toLowerCase();
    if(method === "get"){
      return res.send(`<h1>Welcome to the Registration page!</h1>
      <div>
        <form action='/register' method='POST'>
          <p>
            <label for='name'>Name</label> <input type='text' name='name' id='name' />
          </p>
          <p>
            <label for='email'>Email</label>: <input type='email' name='email' id='email' />
          </p>
          <p>
            <label for='password'>Password</label>: <input type='password' name='password' id='password' />
          </p>
          <p>
            <button type='submit'>Register</button>
            <button type='reset'>Cancel</button>
          </p>
        </form>
      </div>
      <div>
        <h4>OR</h4>
        <p>
          already registered? <a href='/login'>Log In</a>  
        </p>
      </div>
      `)
    }
    res.send("<h1>404 not found!</h1>");
  },
  loadLoginPage: function(req, res, next){
    const method = req.method.toLowerCase();
    if(method === "get"){
      return res.send(`<h1>Welcome to the Log In page!</h1>
      <div>
        <form action='/login' method='POST'>
          <p>
            <label for='email'>Email</label>: <input type='email' name='email' id='email' />
          </p>
          <p>
            <label for='password'>Password</label>: <input type='password' name='password' id='password' />
          </p>
          <p>
            <button type='submit'>Log In</button>
            <button type='reset'>Cancel</button>
          </p>
        </form>
      </div>
      <div>
        <h4>OR</h4>
        <p>
          not yet registered? <a href='/register'>Register</a>  
        </p>
      </div>
      `)
    }
    res.send("<h1>404 not found!</h1>");
  }
};

export default routes;
