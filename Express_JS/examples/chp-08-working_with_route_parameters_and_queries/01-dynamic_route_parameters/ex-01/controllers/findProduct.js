import Product from "../config/database.js";

async function findProduct(req, res){
  const prodName = req.params.name;
  if(!prodName){
    return res.status(404).json({message: "Please enter a product name!"});
  }
  try{
    const productFound = await Product.fetchProductByName(prodName);
    return res.status(200).send(JSON.stringify(productFound, null, 4));
  }catch(err){
    return res.status(404).json({message: err.message});
  }
}

export default findProduct;