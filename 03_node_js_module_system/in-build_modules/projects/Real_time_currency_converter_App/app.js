import readline from 'readline';

import converter from "./modules/converter.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getConvertedAmount(){
  console.log("Currency Converter Program:");
  rl.question("Enter amount (USD): ", (amount) => {
    if(isNaN(Number(amount))){
      console.error("***invalid amount!");
      return getConvertedAmount();
    }
    const sourceAmt = Number(amount);
    rl.question("Enter the destination currency (ex. INR, EUR, DRH, etc.): ", (currency) => {
      if(currency.length === 0){
        console.error("***invalid currency!");
        return getConvertedAmount();
      }
      converter(currency, sourceAmt);
    })
  })
}
getConvertedAmount();