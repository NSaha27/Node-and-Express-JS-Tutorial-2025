import Product from "../config/database.js";

async function updateProduct(req, res){
  const prodID = req.params.ID;
  if(!prodID){
    return res.status(400).json({message: "Please enter a product ID!"});
  } 
  const newProdData = req.body;
  if(newProdData && Object.keys(newProdData).length > 0){
    if(newProdData.name.length === 0 || newProdData.description.length === 0 || newProdData.category.length === 0 || newProdData.price.length === 0){
      return res.status(400).json({message: "Invalid product details!"});
    }
    try{
      const result = await Product.updateProduct(newProdData);
      return res.status(200).send(JSON.stringify({message: result}, null, 4));
    }catch(err){
      return res.status(500).json({message: err.message});
    }
  }else{
    return res.status(400).json({message: "Invalid product detailes!"});
  }
}

export default updateProduct;