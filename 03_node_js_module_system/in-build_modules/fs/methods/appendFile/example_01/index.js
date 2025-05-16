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

const newPatientData = [
  {
    id: "NCSAHAHOW204",
    name: "Narayan Chandra Saha",
    phone: "+919153120391",
    email: "narayan.saha53@gmail.com",
    problem: "prostate gland enlargement"
  },
  {
    id: "TDUTTASRM012",
    name: "Tista Dutta",
    phone: "+919163431961",
    email: "tistadutta07@gmail.com",
    problem: "migrain pain"
  }
];

const server = http.createServer((req, res) => {
  fs.readFile(path.join(process.cwd(), "fileStorage/patient.txt"), "utf-8", (err1, data) => {
    if(err1){
      res.writeHead(500, {"Content-Type": "application/json"});
      res.end(err1.message);
    }
    if(data){
      fs.appendFile(path.join(process.cwd(), "fileStorage/patient.txt"), JSON.stringify(newPatientData), (err2) => {
        if(err2){
          res.writeHead(500, {"Content-Type": "application/json"});
          res.end(err2.message);
        }
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(`${newPatientData.length} new patients were added!`);
      })
    }else{
      fs.writeFile(path.join(process.cwd(), "fileStorage/patient.txt"), JSON.stringify(patientData), (err3) => {
        if(err3){
          res.writeHead(500, {"Content-Type": "application/json"});
          res.end(err3.message);
        }
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(`${patientData.length} patients were added!`);
      })
    }
  })
});

server.listen(PORT, HOST, (err) => {
  if(err){
    throw new Error(`unable to start the server, error: ${err}`);
  }
  console.log(`server is running at http://${HOST}:${PORT}`);
})