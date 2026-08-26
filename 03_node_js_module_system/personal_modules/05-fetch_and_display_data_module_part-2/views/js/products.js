const displayProducts = document.querySelector("#display-products");

const handleAddProdToCart = async(ev) => {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const prodID = formData.get("prodID");
  const addProdToCartPath = "/product";
  try{
    const response = await fetch(addProdToCartPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({prodID,})
    });
    if(!response.ok){
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }else{
      alert("success! this product has been added to your cart");
    }
  }catch(err){
    console.error(err);
    alert("*unable to add the product to the cart, error:", err.message);
    window.location.reload();
  }
}

const cardEl = (product) => {
  const parentDiv = document.createElement("div");
  parentDiv.className = "card";

  // thumbnail image
  const img = document.createElement("img");
  img.src = product.thumbnail;
  img.className = "product-thumbnail";

  // card-body
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  const prodTitle = document.createElement("h2");
  prodTitle.className = "product-title";
  prodTitle.textContent = product.title;
  const prodDescription = document.createElement("p");
  prodDescription.className = "product-description";
  prodDescription.textContent = product.description;
  const rating = document.createElement("h4");
  rating.className = "product-rating";
  rating.textContent = product.rating;
  const inStock = document.createElement("h4");
  inStock.className = "product-instock";
  inStock.textContent = product.availabilityStatus;
  const price = document.createElement("h3");
  price.className = "product-price";
  price.textContent = "$" + product.price;
  cardBody.append(prodTitle, prodDescription, rating, inStock, price);

  // card-footer
  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer";
  const form = document.createElement("form");
  form.method = "POST";
  form.addEventListener("submit", (ev) => handleAddProdToCart(ev));
  const hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.name = "prodID";
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "addtocart-btn";
  submitBtn.textContent = "Add to Cart";
  form.append(hiddenInput, submitBtn);
  cardFooter.appendChild(form);

  // append everything to the parent node and return it
  parentDiv.append(img, cardBody, cardFooter);
  return parentDiv;
}

async function fetchProducts(){
  const fetchProdFromPath = "/product-items";
  const response = await fetch(fetchProdFromPath);
  if(!response.ok){
    const errorMessage = await response.text();
    console.error(errorMessage);
    const h4 = document.createElement("h4");
    h4.textContent = errorMessage;
    return displayProducts.appendChild(h4);
  }else{
    const textStream = response.body.pipeThrough(new TextDecoderStream());
    let chunks = "";
    for await(let textChunk of textStream){
      chunks += textChunk;
    }
    const data = JSON.parse(chunks);
    if(data){
      if (!Object.hasOwn(data, "products")) throw new Error(data.message);
      for(let product of data.products){
        const node = cardEl(product);
        console.log(typeof node);
        displayProducts.appendChild(node);
      }
    }
  }
}

fetchProducts();