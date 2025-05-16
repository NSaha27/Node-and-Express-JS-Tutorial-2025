/*
  Title: Random Quote Generator program.
  Author: niladri Saha. 
  Description: This file contains a Module Scaffolder, and this module scaffolder will have a function that will fetch random quotes from an api and will return one quote at a time, each at an interval of 1 seconds. 
*/

// module Scaffolder
const quote = {};

// fetch quotes from this API
const apiKey = "f5360gD6yNfcjocFpyOm1Q==LdfvGO4bz8xCUXlV";
const apiURL = "https://api.api-ninjas.com/v1/quotes";
const requestOptions = {
  method: "GET",
  headers: {
    "X-Api-Key": apiKey,
  }
};

quote.fetchQuote = async function(quoteNumber){
  const response = await fetch(apiURL, requestOptions);
  return response;
};

export default quote;