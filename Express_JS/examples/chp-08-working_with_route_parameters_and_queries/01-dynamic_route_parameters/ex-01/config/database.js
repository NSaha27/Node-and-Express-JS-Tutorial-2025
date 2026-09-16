const products = [];

class Product{
  constructor(ID, name, description, category, price, rating=1, stock=1){
    this.ID = ID;
    this.name = name;
    this.description = description;
    this.category = category;
    this.price = price;
    this.rating = rating;
    this.stock = stock;
  }
  addProduct(){
    return new Promise((resolve, reject) => {
      try{
        const isAlreadyAvailable = products.find(prod => prod.name === this.name);
        if(isAlreadyAvailable) throw new Error("product is already available!");
        products.push({ID: this.ID, name: this.name, description: this.description, category: this.category, price: Number(this.price), rating: Number(this.rating), stock: Number(this.stock)});
        resolve(`Product with ID "${this.ID}" has successfully been added!`);
      }catch(err){
        reject("Unable to add the product, error: " + err.message);
      }
    })
  }
  static fetchAllProducts(){
    return new Promise((resolve, reject) => {
      try{
        const allProducts = [...products];
        if (allProducts.length === 0)
          throw new Error("No product is yet available!");
        resolve(allProducts);
      }catch(err){
        reject(err.message);
      }
    })
  }
  static fetchProductByName(name){
    return new Promise((resolve, reject) => {
      try{
        const product = products.find(prod => prod.name === name);
        if(!product) throw new Error("No such product found!");
        resolve(product);
      }catch(err){
        reject(err.message);
      }
    })
  }
  static updateProduct(newData){
    return new Promise((resolve, reject) => {
      try {
        const productFoundAt = products.findIndex((prod) => prod.ID === newData.ID);
        if (productFoundAt === -1) throw new Error("no such product found!");
        products.splice(productFoundAt, 1, newData);
        resolve("Success! Product has been updated");
      } catch (err) {
        reject("Unable to update the product, error: " + err.message);
      }
    })
  }
  static deleteProduct(ID){
    return new Promise((resolve, reject) => {
      try{
        const productFoundAt = products.findIndex(
          (prod) => prod.ID === ID,
        );
        if (productFoundAt === -1) throw new Error("no such product found!");
        products.splice(productFoundAt, 1);
        resolve("Success! Product has been deleted");
      }catch(err){
        reject("Unable to delete the product, error: " + err.message);
      }
    })
  }
}

export default Product;