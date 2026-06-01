import getCustData from "./getCustData.js";
import getRecipeData from "./getRecipeData.js";

const getRandomRecipe = async () => {
  const recipes = await getRecipeData();
  const randNum = Math.floor((Math.random() * recipes.length) + 1);
  return recipes[randNum]; 
}

const getRandomPaymentMode = () => {
  const modes = ["cash", "card", "upi", "fund-transfer"];
  const randNum = Math.floor((Math.random() * modes.length) + 1);
  return modes[randNum];
}

const setOrder = async (customer) => {
  const recipe = await getRandomRecipe();
  const randomPaymentMode = getRandomPaymentMode();
  const newOrder = {};
  newOrder["username"] = customer["username"];
  newOrder["name"] = `${customer["firstName"]} ${customer["lastName"]}`;
  newOrder["phone"] = customer["phone"];
  newOrder["email"] = customer["email"];
  newOrder["address"] = customer["address"];
  newOrder["foodItems"] = recipe["name"];
  newOrder["foodCuisine"] = recipe["cuisine"];
  newOrder["foodQuantity"] = recipe["servings"];
  newOrder["orderedFor"] = recipe["mealType"];
  newOrder["paymentMode"] = randomPaymentMode;
  newOrder["cardDetails"] = randomPaymentMode === "card" ? customer["bank"] : {};
  return newOrder;
}

const orders = [];
const customers = await getCustData();
customers.forEach(async (cust) => {
  const newOrder = await setOrder(cust);
  orders.push(newOrder);
});

setTimeout(() => {
  console.log(orders);
}, 10000);
