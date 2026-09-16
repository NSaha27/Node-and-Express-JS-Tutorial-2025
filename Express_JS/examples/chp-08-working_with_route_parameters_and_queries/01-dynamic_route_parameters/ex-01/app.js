import express from "express";

import addProduct from "./controllers/addProduct.js";
import deleteProduct from "./controllers/deleteProduct.js";
import findProduct from "./controllers/findProduct.js";
import getAllProducts from "./controllers/getAllProducts.js";
import updateProduct from "./controllers/updateProduct.js";

const app = express();

app.use(express.json());

const productRouter = express.Router();
app.use(productRouter);

productRouter.get("/find-product/:name", findProduct);
productRouter.post("/add-product", addProduct);
productRouter.put("/update-product/:ID", updateProduct);
productRouter.delete("/delete-product/:ID", deleteProduct);
productRouter.get("/", getAllProducts);

const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
  if(err){
    console.error("Unable to start the server, error:", err.message);
  }else{
    console.log(`Server was started at http://localhost:${PORT}`);
  }
})