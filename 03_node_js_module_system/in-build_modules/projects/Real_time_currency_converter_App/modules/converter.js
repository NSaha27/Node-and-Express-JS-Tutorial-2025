import https from "https";

export default function converter(destinationCurrency, sourceAmt){
  const apiKey = "1eeccfb59edc61c8c944107e";
  const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
  return new Promise((resolve, reject) => {
    return https
      .get(apiURL, (res) => {
        if(res.statusCode < 200 || res.statusCode > 300){
          return reject(new Error("Status code:", res.statusCode));
        }

        let chunks = "";
        res.on("data", (chunk) => {
          chunks += chunk;
        });
        res.on("end", () => {
          try {
            const conversionRates = JSON.parse(chunks).conversion_rates;
            const destinationCode = destinationCurrency.toUpperCase();
            const currencyCodes = Object.keys(conversionRates);
            const isCurrencyPresent = currencyCodes.includes(destinationCode);
            if (isCurrencyPresent === false) {
              throw new Error("***no such currency exists!");
            }
            const convertedAmount = sourceAmt * conversionRates[destinationCode];
            return resolve(
              `Amount after conversion to ${destinationCode} : ${convertedAmount}`,
            );
          } catch (err) {
            return reject(new Error("Parsing error:", err.message));
          }
        });
      })
      .on("error", (err) => {
        return reject(new Error("Request error:", err.message));
      });
  })
}
