import fs from "fs";

const loadSignupPage = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write(`<!DOCTYPE html>
    <html>
      <head><title>Sign Up</title></head>
      <body>
        <h1 class='title'>User Sign Up Page</h1>
        <div class=''>
          <p>Fill up the form below:</p>
          <p>
            <form action='/signup' method='POST'>
              <p>
                <label for=''>Name</label><br />
                <input type='text' name='name' placeholder='enter your name...' />
              </p>
              <p>
                <label for=''>AADHAAR</label><br />
                <input type='text' name='aadhaar' placeholder='enter your aadhaar number...' />
              </p>
              <p>
                <label for=''>Phone</label><br />
                <input type='text' name='phone' placeholder='enter your phone number...' />
              </p>
              <p>
                <label for=''>Email</label><br />
                <input type='email' name='email' placeholder='enter your email id...' />
              </p>
              <p>
                <label for=''>Password</label><br />
                <input type='password' name='password' placeholder='enter your password...' />
              </p>
              <p>
                <label for=''>Confirm Password</label><br />
                <input type='password' name='confirmPassword' placeholder='confirm your password...' />
              </p>
              <p>
                <button type='submit'>Sign Up</button>
              </p>
            </form>
          </p>
        </div>
      </body>
    </html>  
    `);
  return res.end();  
};

const signup = (req, res) => {
  const parseFormValue = (value = "") => {
    return value
    .replaceAll("+", " ")
    .replaceAll("%2C", ",")
    .replaceAll('%40', '@')
    .replaceAll('%2B', '+');
  }
  const sendErrorRedirect = (message) => {
    res.statusCode = 302;
    res.setHeader('Location', `/signup?error=${encodeURIComponent(message)}`);
    res.end();
  };
  const chunks = [];
  req.on('data', (chunk) => {
    chunks.push(chunk);
  });
  req.on('end', () => {
    let parsedFormData;
    try{
      parsedFormData = Buffer.concat(chunks).toString();
    }catch(err){
      return sendErrorRedirect('***invalid request body!');
    }
    const parts = parsedFormData.split('&');
    if(parts.length < 6){
      return sendErrorRedirect("***all fields are required!");
    }
    const namePair = parts[0].split('=');
    const aadhaarPair = parts[1].split('=');
    const phonePair = parts[2].split('=');
    const emailPair = parts[3].split('=');
    const passwordPair = parts[4].split('=');
    const confirmPasswordPair = parts[5].split('=');
    if(!namePair[1]) return sendErrorRedirect("***missing user name!");
    if(!aadhaarPair[1]) return sendErrorRedirect("***missing aadhaar number!");
    if(!phonePair[1]) return sendErrorRedirect("***missing phone number!");
    if(!emailPair[1]) return sendErrorRedirect("***missing email id!");
    if(!passwordPair[1]) return sendErrorRedirect("***missing password!");
    if(!confirmPasswordPair) return sendErrorRedirect("***missing confirm password!");

    const name = parseFormValue(namePair[1]);
    const aadhaar = parseFormValue(aadhaarPair[1]);
    const phone = parseFormValue(phonePair[1]);
    const email = parseFormValue(emailPair[1]);
    const password = parseFormValue(passwordPair[1]);
    const confirmPassword = parseFormValue(confirmPasswordPair[1]);

    if(password !== confirmPassword) return sendErrorRedirect("***password and confirm password must be same!");
    
    fs.readFile("./public/users.json", "utf-8", (er, data) => {
      if(er) {
        console.error(er);
        return sendErrorRedirect("***unable to read the 'users.json' file!");
      }

      let users;
      try{
        users = data ? JSON.parse(data) : [];
      }catch(e){
        console.error(e);
        return sendErrorRedirect("***invalid users store format!");
      }

      const user = users.find(
        (user) =>
          user.name === name && (user.phone === phone || user.email === email),
      );
      if (user) {
        return sendErrorRedirect("***user already registered!");
      } 

      const newUserList = [...users, { name, aadhaar, phone, email, password }];
      fs.writeFile("./public/users.json", JSON.stringify(newUserList), (e) => {
        if (e) {
          console.error(e);
          return sendErrorRedirect("***unable to save user details!");
        } 
        res.statusCode = 302;
        res.setHeader(
          "Location",
          `/login?message=${encodeURIComponent('sign up successful! please log in now')}`,
        );
        return res.end();
      });
    })
  });
  req.on('error', (err) => {
    console.error(err);
    return sendErrorRedirect("***request error!");
  });
}

export { loadSignupPage, signup };

