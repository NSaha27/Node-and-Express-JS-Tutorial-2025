import Product from "../config/database.js";

async function getAllProducts(req, res){
  try{
    const prodLimit = req.query.limit ? Number(req.query.limit) : 10;
    const productList = await Product.fetchAllProducts();
    const listOfLimitedProducts = productList.slice(0, prodLimit);
    return res.status(200).send(JSON.stringify(listOfLimitedProducts, null, 4));
  }catch(err){
    return res.status(404).json({message: err.message});
  }
}
export default getAllProducts;