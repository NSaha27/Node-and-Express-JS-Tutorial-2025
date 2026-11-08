import Product from "../models/product.model.js";

const loadIndexPage = async (req, res) => {
  const username = res.locals.authResult?.username || null;
  if(username){
    req.flash("message", res.locals.authResult.message);
    return res.redirect("/user/dashboard");
  }
  const fileName = "index.ejs";
  try{
    const message = req.flash("message");
    const products = await Product.fetchAllProducts();
    res.status(200).render(fileName, {pageURL: "/", message: message, products: products});
  }catch(err){
    console.error(err.message);
    res.status(404).redirect("/404");
  }
};

export { loadIndexPage };