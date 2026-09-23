import path from "node:path/posix";

async function handleNotFound(req, res){
  const fileName = "404.html";
  try{
    res.status(200).sendFile(path.resolve("views", fileName));
  }catch(err){
    res.status(500).send("Internal server error!");
  }
}

export default handleNotFound;