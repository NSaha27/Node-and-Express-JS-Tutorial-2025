import express from "express";

const app = express();

// defining middlewares
app.use((req, res, next) => {
  console.log("calling the first middleware handler function");
  next();
});

app.use((req, res, next) => {
  console.log("calling the second middleware handler function");
  res.send("Response was sent from the second middleware"); // request handler will not move to the next middleware as next() function is not called and the response is sending from here
});

app.use((req, res, next) => {
  console.log("calling the last middleware handler function");
  res.send("Hi! welcome to Express JS middleware handlers");
})

app.listen(3000, (err) => {
  if(err){
    console.error("Unable to start the server, error:", err.message);
  }else{
    console.log("Server was started at http://localhost:3000");
  }
})