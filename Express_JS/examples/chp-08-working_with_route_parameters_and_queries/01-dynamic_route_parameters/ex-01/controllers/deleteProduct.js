import Product from "../config/database.js";

async function deleteProduct(req, res){
  const prodID = req.params.ID;
  if(!prodID){
    return res.status(400).json({message: "Please enter a product ID!"});
  }
  try{
    const result = await Product.deleteProduct(prodID);
    return res.status(200).send(JSON.stringify({message: result}, null, 4));
  }catch(err){
    return res.status(500).json({message: err.message});
  }
}

export default deleteProduct;