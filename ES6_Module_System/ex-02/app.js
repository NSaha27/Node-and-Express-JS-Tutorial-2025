const fs = require("fs");
const http = require("http");
const path = require("path");

const server = http.createServer(async (req, res) => {
  const req_url = req.url.split("?")[0];
  const req_method = req.method;

  const addProdFilePath = path.join(__dirname, "views", "addProduct.html");
  const homeFilePath = path.join(__dirname, "views", "home.html");
  const saveProdFilePath = path.join(__dirname, "public", "products.json");
  const pageNotFoundFilePath = path.join(__dirname, "views", "404Page.html");

  if(req_url === "/add-product" && req_method === "GET"){
    let content;
    try{
      content = await fs.promises.readFile(addProdFilePath, "utf-8");
    }catch(err){
      console.error(err.message);
      return false;
    }
    if(!content){
      res.statusCode = 404;
      res.setHeader("Location", "/404");
      res.end();
      return false;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    return res.end(content);
  }else if(req_url === "/add-product" && req_method === "POST"){
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", async () => {
      const parsedProdData = Buffer.concat(chunks).toString();
      const [parsedProdTitle, parsedProdCategory, parsedProdDescription, parsedProdPrice] = parsedProdData.split("&");
      const title = parsedProdTitle.split("=")[1];
      const category = parsedProdCategory.split("=")[1];
      const description = parsedProdDescription.split("=")[1];
      const price = parsedProdPrice.split("=")[1];
      let products;
      try{
        const data = await fs.promises.readFile(saveProdFilePath, "utf-8");
        products = data ? JSON.parse(data) : [];
      }catch(err){
        console.error(err.message);
        return false;
      }
      products.push({ title, category, description, price });
      try{
        await fs.promises.writeFile(saveProdFilePath, JSON.stringify(products));
        console.log("***product has been added successfully!");
        res.statusCode = 302;
        res.setHeader("Location", `/add-product?message=${encodeURIComponent("***product has been added successfully!")}`);
        return res.end();
      }catch(err){
        console.error(err.message);
        return false;
      }
    });
    req.on("error", (err) => {
      console.error(err.message);
      return false;
    })
  }else if(req_url === "/404" && req_method === "GET"){
    let content;
    try {
      content = await fs.promises.readFile(pageNotFoundFilePath, "utf-8");
    } catch (err) {
      console.error(err.message);
      return false;
    }
    if (!content) {
      res.statusCode = 502;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>502 forbidden</h1>");
      return false;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    return res.end(content);
  }else if(req_url === "/" && req_method === "GET"){
    let content;
    try{
      content = await fs.promises.readFile(homeFilePath, "utf-8");
    }catch(err){
      console.error(err.message);
      return false;
    }
    if(!content){
      res.statusCode = 404;
      res.setHeader("Location", "/404");
      return res.end();
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    return res.end(content);
  }
});

const PORT = 3000 || 5000;

server.listen(PORT, (err) => {
  if(err){
    console.error(`***unable to start the server, error: ${err.message}`);
  }else{
    console.log(`server has been started at port ${PORT}`);
  }
})