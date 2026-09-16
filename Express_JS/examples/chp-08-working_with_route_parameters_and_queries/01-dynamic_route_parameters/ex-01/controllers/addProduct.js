import Product from "../config/database.js";

function getRandProdID(){
  return new Promise((resolve, reject) => {
    const alp = "abcdefghijklmnopqrstuvwxyz";
    const num = "0123456789";
    const alpNum = alp.concat(num);
    let randAlpNum = "";
    while(randAlpNum.length <= alpNum.length){
      randAlpNum += alpNum[Math.floor((Math.random() * alpNum.length) + 1)];
    }
    const randID = randAlpNum.slice(0, 10);
    resolve(randID);
  })
}

async function addProduct(req, res){
  const product = req.body;
  if(product && Object.keys(product).length > 0){
    if(product.name.length === 0 || product.description.length === 0 || product.category.length === 0 || product.price.length === 0){
      return res.status(400).json({message: "Invalid product details!"});
    }
    product["ID"] = await getRandProdID();
    const newProduct = new Product(product.ID, product.name, product.description, product.category, product.price, product.rating, product.stock);
    try{
      const result = await newProduct.addProduct();
      return res.status(200).send(JSON.stringify({message: result}, null, 4));
    }catch(err){
      return res.status(500).json({message: err.message});
    }
  }else{
    return res.status(400).json({message: "Invalid product details!"});
  }
}

export default addProduct;