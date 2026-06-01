const API = "https://dummyjson.com/recipes?limit=20";

const getRecipeData = async () => {
  try{
    const response = await fetch(API);
    const recipe = await response.json();
    return recipe["recipes"];
  }catch(err){
    console.error(err.message);
    return false;
  }
};

export default getRecipeData;