import cookie from "cookie";
import fs from "fs";

const loadLoginPage = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write(`<!DOCTYPE html>
    <html>
      <head><title>Log In</title></head>
      <body>
        <h1 class='title'>User Log In Page</h1>
        <div class=''>
          <p>Enter the following details:</p>
          <p>
            <form action='/login' method='POST'>
              <p>
                <label for=''>Email</label><br />
                <input type='email' name='email' placeholder='enter your email id...' />
              </p>
              <p>
                <label for=''>Password</label><br />
                <input type='password' name='password' placeholder='enter your password...' />
              </p>
              <p>
                <button type='submit'>Log In</button>
              </p>
            </form>
          </p>
        </div>
      </body>
    </html>`);
    return res.end();
};

const login = (req, res) => {
  const parseFormValue = (value) => {
    let val = value;
    val = val.replaceAll("+", " ");
    val = val.replaceAll("%2C", ",");
    val = val.replaceAll('%40', '@');
    val = val.replaceAll('%2B', '+');
    return val;
  }
  const sendErrorRedirect = (message) => {
    res.statusCode = 302;
    res.setHeader('Location', `/login?error=${encodeURIComponent(message)}`);
    res.end();
  }
  const chunks = [];
  req.on('data', (chunk) => {
    chunks.push(chunk);
  })
  req.on('end', () => {
    let parsedLoginData;
    try{
      parsedLoginData = Buffer.concat(chunks).toString();
    }catch(err){
      return sendErrorRedirect('***invalid request body!');
    }
    const parts = parsedLoginData.split('&');
    if(parts.length < 2){
      return sendErrorRedirect('***missing log in fields!');
    }
    const emailPair = parts[0].split('=');
    const passwordPair = parts[1].split('=');
    if(!emailPair[1] || !passwordPair[1]){
      return sendErrorRedirect("***missing email id or password!");
    }
    
    const email = parseFormValue(emailPair[1]);
    const password = parseFormValue(passwordPair[1]);

    fs.readFile("./public/users.json", "utf-8", (err, data) => {
      if(err){
        console.error(err);
        return sendErrorRedirect(`***unable to read the 'users.json' file, error: ${err.message}`);
      }
      let users;
      try{
        users = data ? JSON.parse(data) : [];
      }catch(err){
        return sendErrorRedirect("***invalid users store format!");
      }

      const user = users.find(user => user.email === email && user.password === password);
      if(!user){
        return sendErrorRedirect("***invalid log in credentials!");
      }
      res.setHeader('Set-Cookie', cookie.stringifySetCookie({
        name: 'loggedInUser',
        value: email,
        httpOnly: true,
        maxAge: 60 * 60
      }));
      res.statusCode = 302;
      res.setHeader('Location', `/?id=${encodeURIComponent(email)}&message=${encodeURIComponent('***log in successful!')}`);
      res.end();
    });
  });
  req.on('error', (err) => {
    console.error(err);
    return sendErrorRedirect('***request error!');
  })
}

export { loadLoginPage, login };

