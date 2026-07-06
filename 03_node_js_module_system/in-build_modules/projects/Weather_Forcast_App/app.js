import https from "https";
import readline from "readline";

const rl = new readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const apiKey = "4ac36aca8acfcbe46b1949f2157667be";

async function getWeatherDetails(cityName){
  if(cityName.length === 0){
    throw new Error("*invalid city name!");
  }
  return new Promise((resolve, reject) => {
    https.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${encodeURIComponent(apiKey)}`, (response) => {
        if(response.statusCode < 200 || response.statusCode > 300){
          return reject(new Error("Status code: " + response.statusCode));
        }

        let chunks = "";
        response.on("data", (chunk) => {
          chunks += chunk;
        });
        response.on("end", () => {
          try{
            const weather = chunks.length > 0 ? JSON.parse(chunks) : {};
            return resolve(weather);
          }catch(err){
            return reject(new Error("Data parsing error: " + err.message));
          }
        })
      }
    ).on("error", (err) => {
      return reject(new Error("Request error: " + err.message));
    });
  })
}

function handleOption(){
  rl.question("\nDo you want to continue? (y/n): ", (option) => {
    switch(option){
      case "y" || "Y":
        getWeatherForcast();
        break;
      case "n" || "N":
        console.log("Thank you, visit again!");
        rl.close();
        break;
      default:
        console.error("**please select a valid option!");
        handleOption();
    }
  });
}

function getWeatherForcast(){
  console.log("\n-:Weather Forcast App:-");
  rl.question("Enter a city name to get its weather condition: ", async (city) => {
    if(city.length === 0){
      console.error("*The city name is required!");
      return getWeatherForcast();
    }
    try{
      const details = await getWeatherDetails(city);
      if (details) {
        console.log("\nWeather Information:");
        console.log(`City: ${details["name"]}`);
        console.log(
          `Temperature: ${(details["main"]["temp"] - 273.15).toFixed(2)}*C`,
        );
        console.log(`Forcast: ${details["weather"][0]["description"]}`);
        console.log(`Humidity: ${details["main"]["humidity"]}%`);
        console.log(`Wind Speed: ${details["wind"]["speed"]} m/s`);
        handleOption();
      }else{
        console.log("weather data is loading...");
      }
    }catch(err){
      console.error(err.message);
      return rl.close();
    }
  })
}
getWeatherForcast();