const EventEmitter = require("events");
const fs = require("fs");
const path = require("path");

const addProductEmitter = new EventEmitter();

const fileName = "product.json";
const filePath = path.join(__dirname, "files", fileName);

addProductEmitter.on("add-product", async (data) => {
  const parsedProdData = JSON.parse(data);
  let products;
  try {
    const res = await fs.promises.readFile(filePath, "utf-8");
    products = JSON.parse(res);
    const prodFoundAt = products.findIndex(prod => prod.name === parsedProdData.name && prod.category === parsedProdData.category);
    if (prodFoundAt !== -1) {
      throw new Error("***product already exists!");
    }
  } catch (err) {
    console.error(err.message);
    return false;
  }
  products.push(parsedProdData);
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(products), "utf-8");
    console.log("***the new product has been added!");
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
});

module.exports = addProductEmitter;