// core modules
import fs from "fs";
import path from "path";

// external modules
import express from "express";

// local modules

const app = express();

const host = process.env.HOST || "127.0.0.1";
const port = process.env.NODE_ENV === "development" ? 3000 : 5000;

app.use((req, res, next) => {
  console.log(`The requested path is "${req.url}"`);
  next();
});
app.use((req, res, next) => {
  console.log(`The request method is "${req.method}"`);
  next();
});
// app.use((req, res, next) => {
//   res.send("welcome to the 'Complete coding', this is the first project on Express JS!");
// });
app.get("/contact-us", (req, res, next) => {
  res.send(`<h1>Welcome to the Contact Us page!</h1>
    <div>
      <h3>Contact Us</h3>
      <div>
        <form action='/contact-us' method='POST'>
          <p>
            <label for='name'>Enter Name</label>: <input type='text' name='name' id='name' />
          </p>
          <p>
            <label for='email'>Enter Email ID</label>: <input type='email' name='email' id='email' />
          </p>
          <p>
            <button type='submit'>Send</button>
          </p>
        </form>
      </div>
    </div>`)
});
app.get("/", (req, res, next) => {
  res.send("<h1>Welome to the project home page!</h1>");
});
app.post("/contact-us", (req, res, next) => {
  let reqBody = [];
  req.on("data", (chunk) => {
    reqBody.push(chunk);
  });
  req.on("end", () => {
    const reqBodyStr = Buffer.concat(reqBody).toString();
    const params = new URLSearchParams(reqBodyStr);
    const jsonObject = Object.fromEntries(params);
    const filePath = path.resolve(process.cwd(), ".data", `${jsonObject.email.split("@")[0]}.json`);
    fs.writeFile(filePath, JSON.stringify(jsonObject), (err) => {
      if(err){
        next("unable to save the contact details!");
      }else{
        res.statusCode = 302;
        res.setHeader("message", "contact details was saved successfully!");
        res.setHeader("Location", "/contact-us");
        res.end();
      }
    })
  })
})
app.use((err, req, res, next) => {
  res.send(err.message);
})

app.listen(port, host, err => {
  if(!err){
    console.log(`server is running at http://${host}:${port}`);
  }else{
    console.log("sorry, unable to start the server!");
    
  }
})
