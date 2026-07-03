import chalk from 'chalk';
import https from "https";

export default function converter(destinationCurrency, sourceAmt){
  const apiKey = "1eeccfb59edc61c8c944107e";
  const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
  https.get(apiURL, (res) => {
    const chunks = [];
    res.on("data", (chunk) => {
      chunks.push(chunk);
    });
    res.on("end", () => {
      const currency = chunks.length > 0 ? JSON.parse(chunks.toString()) : {};
      const destinationCode = destinationCurrency.toUpperCase();
      const conversionRates = currency.conversion_rates;
      const currencyCodes = Object.keys(conversionRates);
      const isCurrencyPresent = currencyCodes.includes(destinationCode);
      if(isCurrencyPresent === false){
        console.error(chalk.red("***no such currency exists!"));
        return false;
      }
      const convertedAmount = sourceAmt * convertedRates[destinationCode];
      console.log(
        `Amount after conversion to ${destinationCode} : ${convertedAmount} ${destinationCode}`,
      );
      return true;
    });
    res.on("error", (err) => {
      console.error(chalk.red(err.message));
      return false;
    })
  })
}
