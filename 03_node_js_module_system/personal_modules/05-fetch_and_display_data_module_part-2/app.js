import fs from "node:fs/promises";
import https from "node:https";
import path from "node:path/posix";

const server = https.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;

  if(url === "/product-items" && method === "GET"){
    const apiEndPoint = "";
    const apiKey = "";
    try{
      const response = await fetch(apiEndPoint);
      const data = await response.json();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({products: data.product}));
    }catch(err){
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({message: "400 Bad Request!"}));
    }
  }else if(url === "/product" && method === "GET"){
    const fileName = "products.html";
    const filePath = path.resolve(path.dirname, "views", fileName);
    try{
      const pageContent = await fs.readFile(filePath, "utf-8");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      return res.end(pageContent);
    }catch(err){
      res.statusCode = 302;
      res.setHeader("Location", "/404");
      return res.end();
    }
  }else if(url === "/product" && method === "POST"){
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", async() => {
      const formData = Buffer.concat(chunks).toString();
      const product = formData.length > 0 ? JSON.parse(formData) : {};
      if(Object.keys(product).length === 0){
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        return res.end({message: "400 Bad request!"});
      }
      const fileName = "cart.json";
      const filePath = path.resolve(path.dirname(), "files", fileName);
      let cartProducts;
      try{
        const cart = await fs.readFile(filePath, "utf-8");
        cartProducts = cart ? JSON.parse(cart) : {};
      }catch(err){
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({message: "* Internal server error!"}));
      }
      const isPresentInCart = cartProducts.find((prod) => prod.prodID === product.prodID);
      if(!isPresentInCart){
        cartProducts[product.prodID] = 1;
      }else{
        cartProducts[product.prodID] += 1;
      }
      try{
        await fs.writeFile(filePath, cartProducts, "utf-8");
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({message: "Success, product added to the cart!"}));
      }catch(err){
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({message: "Internal server error, unable to add product to the cart!"}));
      }
    })
  }
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

server.listen(PORT, (err) => {
  if(err){
    console.error(`*unable to start the server, error: ${err.message}`);
  }else{
    console.log(`*the server has been started at http://${HOST}:${PORT}`);
  }
})
