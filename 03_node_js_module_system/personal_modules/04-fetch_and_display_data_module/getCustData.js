const API = "https://dummyjson.com/users?limit=10";

const getCustData = async () => {
  try{
    const response = await fetch(API);
    const users = await response.json();
    return users["users"];
  }catch(err){
    console.error(err.message);
    return false;
  }
};

export default getCustData;