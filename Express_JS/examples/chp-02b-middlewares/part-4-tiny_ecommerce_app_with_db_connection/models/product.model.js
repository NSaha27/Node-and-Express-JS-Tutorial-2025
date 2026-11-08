import {ObjectId} from "mongodb";

import {getDB} from "../config/db.js";

class Product{
  constructor(username, name, category, description, price, image){
    this.username = username;
    this.name = name;
    this.category = category;
    this.description = description;
    this.price = price;
    this.image = image;
  }
  async addProduct(){
    try{
      const db = getDB();
      const productCollection = db.collection("product");

      const productFound = await productCollection.findOne({username: this.username, name: this.name});
      if(productFound){
        return {message: "Product already exists!"};
      }

      const result = await productCollection.insertOne({
        username: this.username,
        name: this.name,
        category: this.category,
        description: this.description,
        price: Number(this.price),
        image: this.image,
      });

      return { message: "A new product has been added!", productId: result.insertedId };
    }catch(err){
      throw new Error("Unable to add the new product, error: " + err.message);
    }
  }
  static async fetchAllProducts(){
    try{
      const db = getDB();
      const productCollection = db.collection("product");
      const products = await productCollection.find({}).toArray();
      if(!products){
        return {message: "No product was found!"};
      }
      return products;
    }catch(err){
      throw new Error(err.message);
    }
  }
  static async findProduct(id){
    try{
      if(!ObjectId.isValid(id)){
        return {message: "Invalid product Id!"};
      }

      const db = getDB();
      const productCollection = db.collection("product");
      const productFound = await productCollection.findOne({_id: new ObjectId(id)});
      if (!productFound) {
        return {message: "Failed! no such product was found"};
      }
      return productFound;
    }catch(err){
      throw new Error("Unable to find the product, error: " + err.message);
    }
  }
  static async editProduct(newData){
    try {
      const db = getDB();
      const productCollection = db.collection("product");

      const result = await productCollection.updateOne({_id: new ObjectId(newData.id)}, {$set: {username: newData.username, name: newData.name, category: newData.category, description: newData.description, price: Number(newData.price), image: newData.image}});

      return {message: "Success! the product has been updated", modifiedCount: result.modifiedCount};
    } catch (err) {
      return new Error("Unable to update the product, error: " + err.message);
    }
  }
  static async deleteProduct(id){
    try {
      if(!ObjectId.isValid(id)){
        return {message: "Invalid product ID!"};
      }

      const db = getDB();
      const productCollection = db.collection("product");

      const result = await productCollection.deleteOne({ _id: new ObjectId(id) });
      return { message: "Success! the product has been deleted", deletedCount: result.deletedCount };
    } catch (err) {
      return new Error("Unable to delete the product, error: " + err.message);
    }
  }
}

export default Product;