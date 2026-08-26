import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path/posix";

const server = http.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/product-items" && method === "GET") {
    const apiEndPoint = "https://dummyjson.com/products";
    try {
      const response = await fetch(apiEndPoint);
      const data = await response.json();
      if (data && Object.keys(data).length > 0) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ products: data.products }));
      }
    } catch (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ message: err.message }));
    }
  } else if (url === "/product" && method === "GET") {
    const fileName = "products.html";
    const filePath = path.resolve("views", fileName);
    try {
      const pageContent = await fs.readFile(filePath, "utf-8");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      return res.end(pageContent);
    } catch (err) {
      res.statusCode = 302;
      res.setHeader("Location", "/404");
      return res.end();
    }
  } else if (url === "/product" && method === "POST") {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", async () => {
      const formData = Buffer.concat(chunks).toString();
      const product = formData.length > 0 ? JSON.parse(formData) : {};
      if (Object.keys(product).length === 0) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ message: "400 Bad request!" }));
      }
      const fileName = "cart.json";
      const filePath = path.resolve("files", fileName);
      let cartProducts;
      try {
        const cart = await fs.readFile(filePath, "utf-8");
        cartProducts = cart ? JSON.parse(cart) : {};
      } catch (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ message: "Internal server error!" }));
      }
      const isPresentInCart = Object.keys(cartProducts).includes(
        product.prodID,
      );
      if (!isPresentInCart) {
        cartProducts[product.prodID] = 1;
      } else {
        cartProducts[product.prodID] += 1;
      }
      try {
        await fs.writeFile(filePath, JSON.stringify(cartProducts), "utf-8");
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(
          JSON.stringify({
            message: "Success, the product has been added to the cart!",
            status: true,
          }),
        );
      } catch (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        return res.end(
          JSON.stringify({
            message:
              "Internal server error, unable to add the product to the cart!",
          }),
        );
      }
    });
  } else if (url === "/cart-items" && method === "GET") {
    const fileName = "cart.json";
    const filePath = path.resolve("files", fileName);
    let cartItems;
    try {
      const data = await fs.readFile(filePath, "utf-8");
      cartItems = data ? JSON.parse(data) : {};
    } catch (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ message: err.message }));
    }
    if (cartItems) {
      const apiEndPoint = "https://dummyjson.com/products";
      const products = [];
      for (let item of Object.keys(cartItems)) {
        const response = await fetch(apiEndPoint + `/${item}`);
        const product = await response.json();
        if (product && Object.keys(product).length > 0) {
          products.push(product);
        }
      }
      if (products.length > 0) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(products));
      }
    }
  } else if (url === "/cart" && method === "GET") {
    const fileName = "cart.html";
    const filePath = path.resolve("views", fileName);
    try {
      const pageContent = await fs.readFile(filePath, "utf-8");
      if (pageContent) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        return res.end(pageContent);
      }
    } catch (err) {
      res.statusCode = 404;
      res.setHeader("Location", "/404");
      return res.end();
    }
  } else if (url === "/cart" && method === "POST") {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", async () => {
      const formData = Buffer.concat(chunks).toString();
      const action = formData.length > 0 ? JSON.parse(formData) : {};
      if (Object.keys(action).length === 0) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ message: "400 Bad Request!" }));
      }
      const fileName = "cart.json";
      const filePath = path.resolve("files", fileName);
      let cartItems;
      try {
        const content = await fs.readFile(filePath, "utf-8");
        cartItems = content.length > 0 ? JSON.parse(content) : {};
      } catch (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ message: err.message }));
      }
      if (cartItems) {
        switch (action.type) {
          case "INCREASE":
            cartItems[action.payload] += 1;
            break;
          case "DECREASE":
            if (cartItems[action.payload] > 1) {
              cartItems[action.payload] -= 1;
            }
            break;
          case "DELETE":
            delete cartItems[action.payload];
            break;
          default:
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ message: "400 Bad Request!" }));
        }

        try {
          await fs.writeFile(filePath, JSON.stringify(cartItems), "utf-8");
          res.statusCode = 302;
          res.setHeader("Location", "/cart");
          return res.end();
        } catch (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({ message: err.message }));
        }
      }
    });
  } else if (url === "/js/products" && method === "GET") {
    const fileName = "products.js";
    const filePath = path.resolve("views", "js", fileName);
    try {
      const pageContent = await fs.readFile(filePath, "utf-8");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/javascript");
      return res.end(pageContent);
    } catch (err) {
      res.statusCode = 302;
      res.setHeader("Location", "/404");
      return res.end();
    }
  } else if (url === "/css/styles" && method === "GET") {
    const fileName = "style.css";
    const filePath = path.resolve("views", "css", fileName);
    try {
      const pageContent = await fs.readFile(filePath, "utf-8");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/css");
      return res.end(pageContent);
    } catch (err) {
      res.statusCode = 302;
      res.setHeader("Location", "/404");
      return res.end();
    }
  } else if (url === "/" && method === "GET") {
    const fileName = "welcome.html";
    const filePath = path.resolve("views", fileName);
    try {
      const pageContent = await fs.readFile(filePath, "utf-8");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      return res.end(pageContent);
    } catch (err) {
      res.statusCode = 302;
      res.setHeader("Location", "/404");
      return res.end();
    }
  } else {
    const fileName = "pagenotfound.html";
    const filePath = path.resolve("views", fileName);
    try {
      const pageContent = await fs.readFile(filePath, "utf-8");
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      return res.end(pageContent);
    } catch (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ message: err.message }));
    }
  }
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

server.listen(PORT, (err) => {
  if (err) {
    console.error(`*unable to start the server, error: ${err.message}`);
  } else {
    console.log(`*the server has been started at http://${HOST}:${PORT}`);
  }
});
