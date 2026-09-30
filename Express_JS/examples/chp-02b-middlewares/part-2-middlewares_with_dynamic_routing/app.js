import express from "express";

const app = express();

let products = [
  {
    id: 100,
    name: "LG 24\" IPS monitor",
    brand: "LG",
    description: "24\" monitor with IPS display, 144Hz refresh rate, and 250 nots gamut retina display",
    price: 7999,
  },
];

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/add-product", (req, res, next) => {
  try{
    const newProduct = req.body;
    if(!newProduct instanceof Object || Object.keys(newProduct).length === 0){
      throw new Error("Failed! invalid product details!");
    }
    products.push(newProduct);
    res.send({message: "Success! a new product was added!"});
  }catch(err){
    next(new Error(`Failed! unable to add the new product, error: ${err.message}`));
  }
});

app.use("/get-product/:id", (req, res, next) => {
  const prodID = req.params.id || null;
  try{
    const productFound = products.find(prod => prod.id === Number(prodID));
    if(!productFound){
      throw new Error("Failed! no such product was found");
    }
    res.send({product: productFound});
  }catch(err){
    next(err);
  }
});

app.use("/edit-product/:id", (req, res, next) => {
  const prodID = req.params.id || null;
  try{
    const newData = req.body;
    if(!newData instanceof Object || Object.keys(newData).length === 0){
      throw new Error("Failed! invalid product details");
    }
    const productFound = products.find((prod) => prod.id === Number(prodID));
    if (!productFound) {
      throw new Error("Failed! no such product was found");
    }
    const updatedProdList = products.map(prod => {
      if(prod.id === Number(prodID)){
        return newData;
      }else{
        return prod;
      }
    })
    products = updatedProdList;
    res.send({message: "Success! the product was updated"});
  }catch(err){
    next(err);
  }
});

app.use("/delete-product/:id", (req, res, next) => {
  const prodID = req.params.id || null;
  try{
    const productFound = products.find((prod) => prod.id === Number(prodID));
    if (!productFound) {
      throw new Error("Failed! no such product was found");
    }
    const updatedProdList = products.filter(prod => prod.id !== Number(prodID));
    products = updatedProdList;
    res.send({message: "Success! the product was deleted"});
  }catch(err){
    next(err);
  }
})

app.use("/products", (req, res, next) => {
  try{
    res.send(products);
  }catch(err){
    next(new Error(`Unable to fetch product list, error: ${err.message}`));
  }
});

app.use((req, res, next) => {
  res.status(404).send("Route not found!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || "Internal server error!"
  });
});

app.listen(3000, (err) => {
   if (err) {
     console.error("Unable to start the server, error:", err.message);
   } else {
     console.log("Server was started at http://localhost:3000");
   }
});