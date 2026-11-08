import Product from "../models/admin.model.js";

const loadProductsPage = async (req, res) => {
  const username = res.locals.authResult?.username || null;
  if (!username) {
    req.flash("message", "Please log in at first!");
    return res.redirect("/admin/login");
  }
  const fileName = "display-all-products.ejs";
  try {
    const message = req.flash("message");
    const products = await Product.fetchAllProducts();
    return res.status(200).render(`product/${fileName}`, {
      pageURL: "/products",
      message: message,
      products: products,
      role: "admin",
      username: username
    });
  } catch (err) {
    console.error(err);
    res.status(302).redirect("/404");
  }
};

const loadAddProductPage = async (req, res) => {
  const username = res.locals.authResult?.username || null;
  if (!username) {
    req.flash("message", "Please log in at first!");
    return res.redirect("/admin/login");
  }
  const fileName = "add-product.ejs";
  try {
    const message = req.flash("message");
    res
      .status(200)
      .render(`product/${fileName}`, {
        pageURL: "/admin/add-product",
        message: message,
        role: "admin",
        username: username
      });
  } catch (err) {
    console.error(err);
    res.status(302).redirect("/404");
  }
};

const handleAddProduct = async (req, res) => {
  const reqBody = req.body;
  if (
    reqBody.username.length === 0 ||
    reqBody.name.length === 0 ||
    reqBody.category.length === 0 ||
    reqBody.description.length === 0 ||
    reqBody.price.length === 0 ||
    reqBody.image.length === 0
  ) {
    req.flash("message", "All fields are required!");
    return res.status(400).redirect("/admin/add-product");
  }
  try {
    const newProduct = new Product(
      reqBody.username,
      reqBody.name,
      reqBody.category,
      reqBody.description,
      reqBody.price,
      reqBody.image,
    );
    const result = await newProduct.addProduct();
    req.flash("message", result.message);
    return res.status(200).redirect("/admin/add-product");
  } catch (err) {
    console.error(err);
    req.flash(
      "message",
      "Failed! unable to add the new product, error: " + err.message,
    );
    res.status(500).redirect("/admin/add-product");
  }
};

export { loadProductsPage, loadAddProductPage, handleAddProduct };