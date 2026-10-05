import express from "express";
import path from "node:path/posix";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve("public")));

// routes
app.use("/admin", );
app.use("/user", );

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";
app.listen(PORT, HOST, (err) => {
  if(err){
    console.error("Unable to start the server!");
  }else{
    console.log(`Server was started at http://${HOST}:${PORT}`);
  }
});
