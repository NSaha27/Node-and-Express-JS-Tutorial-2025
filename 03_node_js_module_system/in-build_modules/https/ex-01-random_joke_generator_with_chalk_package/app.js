import chalk from "chalk";
import https from "https";

function randJokeGenerator(){
  const apiURL = "https://official-joke-api.appspot.com/random_joke";
  https.get(apiURL, (res) => {
    const chunks = [];
    res.on("data", (chunk) => {
      chunks.push(chunk);
    })
    res.on("end", () => {
      const joke = chunks.length > 0 ? JSON.parse(chunks.toString()) : {type: "", setup: "", punchline: ""};
      console.log(`Here is a random ${joke.type} joke:`);
      console.log(chalk.green(joke.setup));
      console.log(chalk.bgGreenBright.green(joke.punchline));
    })
    res.on("error", (err) => {
      console.error(err.message);
      return false;
    })
  })
}

randJokeGenerator();