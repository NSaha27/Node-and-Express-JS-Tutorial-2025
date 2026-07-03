import readline from 'readline';

import converter from "./modules/converter.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getConvertedAmount(){
  console.log("\nCurrency Converter Program:");
  rl.question("Enter amount (USD): ", (amount) => {
    if(isNaN(Number(amount))){
      console.error("***invalid amount!");
      return getConvertedAmount();
    }
    const sourceAmt = Number(amount);
    rl.question("Enter the destination currency (ex. INR, EUR, DRH, etc.): ", async (currency) => {
      if(currency.length === 0){
        console.error("***invalid currency!");
        return getConvertedAmount();
      }
      try{
        const result = await converter(currency, sourceAmt);
        if(result){
          console.log(result);
          rl.question("Do you want to continue? (y/n): ", (ans) => {
            if(ans === 'Y' || ans === "y"){
              return getConvertedAmount();
            }else if(ans === "N" || ans === "n"){
              console.log("Thank you, please visit again :)");
              return rl.close();
            }
          })
        }
      }catch(err){
        console.error(`*unable to perform conversion, error: ${err.message}`);
        rl.close();
        return false;
      }
    })
  })
}
getConvertedAmount();