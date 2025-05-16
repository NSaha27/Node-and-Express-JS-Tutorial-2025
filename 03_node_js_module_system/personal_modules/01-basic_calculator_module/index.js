import { add, divide, multiply, subtract } from "./calculator.js";

const [num1, num2, option] = process.argv.slice(2);

try{
  switch(option){
    case "add":
      console.log(add(num1, num2));
      break;
    case "subtract":
      console.log(subtract(num1, num2));
      break;
    case "multiply":
      console.log(multiply(num1, num2));
      break;
    case "divide":
      console.log(divide(num1, num2));
      break;
    default:
      console.log("invalid option, please select a correct option (add, subtract, multiply, divide)!");
  }
}catch(error){
  console.log("There is an error while doing the operation, error:", error.message);
}