import fs from "fs";
import http from "http";
import path from "path";

const HOST = "127.0.0.1";
const PORT = 3000;

const patientData = [
  {
    id: "NDHARHOW104",
    name: "Nilanjan Dhar",
    phone: "+917240921520",
    email: "nilanjan.dhar71@gmail.com",
    problem: "heart palpitition"
  },
  {
    id: "AMODAKKOL075",
    name: "Abhijit Modak",
    phone: "+918420700144",
    email: "abhijit.modak68@gmail.com",
    problem: "gastritis"
  },
  {
    id: "SPAULKOL076",
    name: "Saheli Paul",
    phone: "+916284872309",
    email: "iamsaheli02@gmail.com",
    problem: "lower back pain"
  }
];
const server = http.createServer((req, res) => {
  fs.writeFile(path.join(process.cwd(), "fileStorage/patient.json"), JSON.stringify(patientData), (err) => {
    if(err){
      res.writeHead(500, {"Content-Type": "application/json"});
      res.end({"message": "unable to write into the file, error:" + err.message});
    }else{
      fs.readFile(path.join(process.cwd(), "fileStorage/patient.json"), "utf-8", (er, data) => {
        if(er){
          res.writeHead(500, {"Content-Type": "application/json"});
          res.end({"message": "unable to read the file, error:" + err.message});
        }else{
          // const patientData = new Buffer();
          res.writeHead(200, {"Content-Type": "application/json"});
          res.end(data.toString());
        }
      })
    }
  })
});

server.listen(PORT, HOST, (err) => {
  if(!err){
    console.log(`server is running at http://${HOST}:${PORT}`);
  }else{
    console.error(err.message);
  }
})