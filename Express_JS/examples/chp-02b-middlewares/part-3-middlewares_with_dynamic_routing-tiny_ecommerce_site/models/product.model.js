import fs from "node:fs/promises";
import path from "node:path/posix";

class Product{
  constructor(id, name, category, description, price, image){
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.price = price;
    this.image = image;
  }
  async addProduct(){
    const result = await Product.fetchAllProducts();
    if(result instanceof Error){
      return new Error(result.message);
    }
    const productFound = result.find(prod => prod.id === this.id && prod.name.toLowercase() === this.name.toLowercase());
    if(productFound){
      return new Error("Product already exists!");
    }
    result.push({id: this.id, name: this.name, category: this.category, description: this.description, price: Number(this.price), image: this.image});
    return new Promise((resolve, reject) => {
      const writableStream = fs.createWriteStream(filePath, {encoding: "utf-8", highWaterMark: 16, flags: "w"});
      writableStream.write(JSON.stringify(result));
      writableStream.end();
      writableStream.on("finish", () => {
        resolve("A new product has been added!");
      });
      writableStream.on("error", (err) => {
        reject("Unable to add the new product, error: " + err.message);
      });
    })
  }
  static fetchAllProducts(){
    const fileName = "product.json";
    const filePath = path.resolve("config", fileName);
    return new Promise((resolve, reject) => {
      const chunks = [];
      const readableStream = fs.createReadStream(filePath, {encoding: "utf-8", highWaterMark: 16});
      readableStream.on("data", (chunk) => {
        chunks.push(chunk);
      });
      readableStream.on("end", () => {
        const fileContent = chunks.toString();
        const products = fileContent.length > 0 ? JSON.parse(fileContent) : [];
        resolve(products);
      });
      readableStream.on("error", (err) => {
        reject(new Error(`Unable to read the file, error: ${err.message}`));
      })
    })
  }
  static async findProduct(id){
    const result = await Product.fetchAllProducts();
    if (result instanceof Error) {
      return new Error(result.message);
    }
    const productFound = result.find(
      (prod) =>
        prod.id === id
    );
    if (!productFound) {
      return new Error("Failed! no such product was found");
    }
    return productFound;
  }
  static async editProduct(newData){
    const result = await Product.fetchAllProducts();
    if (result instanceof Error) {
      return new Error(result.message);
    }
    const productFoundAt = result.findIndex((prod) => prod.id === newData.id && prod.name.toLowercase() === newData.name.toLowercase());
    if (productFoundAt === -1) {
      return new Error("Failed! no such product was found");
    }
    result.splice(productFoundAt, 1, newData);
    const fileName = "product.json";
    const filePath = path.resolve("config", fileName);
    return new Promise((resolve, reject) => {
      const writableStream = fs.createWriteStream(filePath, {flags: "w", encoding: "utf-8"});
      writableStream.write(JSON.stringify(result));
      writableStream.end();
      writableStream.on("finish", () => {
        resolve("Success! the product has been updated");
      });
      writableStream.on("error", (err) => {
        reject(new Error(`Unable to edit the product, error: ${err.message}`));
      })
    })
  }
  static async deleteProduct(id){
    const result = await Product.fetchAllProducts();
    if (result instanceof Error) {
      return new Error(result.message);
    }
    const productFoundAt = result.findIndex(
      (prod) =>
        prod.id === id
    );
    if (productFoundAt === -1) {
      return new Error("Failed! no product with this ID was found");
    }
    result.splice(productFoundAt, 1);
    const fileName = "product.json";
    const filePath = path.resolve("config", fileName);
    return new Promise((resolve, reject) => {
      const writableStream = fs.createWriteStream(filePath, {encoding: "utf-8", flags: "w"});
      writableStream.write(JSON.stringify(result));
      writableStream.end();
      writableStream.on("finish", () => {
        resolve("Success! the product has been deleted");
      });
      writableStream.on("error", (err) => {
        reject(
          new Error(`Unable to delete the product, error: ${err.message}`),
        );
      })
    })
  }
}

export default Product;