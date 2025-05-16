/*
  Title: Random Quote Generator program.
  Author: niladri Saha. 
  Description: This file contains a Module Scaffolder, and this module scaffolder will have a function that will fetch random quotes from an api and will return one quote at a time, each at an interval of 1 seconds. 
*/

import quote from "./quoteGenerator.js";
import randNumberGenerator from "./randNumberGenerator.js";

// App Object - Module Scaffolding
const app = {};

app.config = {
  timeBetweenQuotes: 1000
};

app.printAQuote = async function(){
  try{
    const response = await quote.fetchQuote();
    if(!response.ok){
      throw new Error("network response is not ok!");
    }
    const quotes = await response.json();
    const numOfQuotes = quotes.length;
    const randNum = randNumberGenerator(0, (numOfQuotes - 1));
    console.log(quotes[randNum]);
  }catch(err){
    console.error(err.message);
  }
};

app.indefiniteLoop = function(){
  setInterval(() => {app.printAQuote()}, app.config.timeBetweenQuotes);
}

app.indefiniteLoop();