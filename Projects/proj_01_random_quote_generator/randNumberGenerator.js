/*
  Title: Random Quote Generator program.
  Author: niladri Saha. 
  Description: This file contains a Module Scaffolder, and this module scaffolder will have a function that will fetch random quotes from an api and will return one quote at a time, each at an interval of 1 seconds. 
*/

function randNumberGenerator(min=0, max=1){
  return Math.floor(Math.random * (max - min) + min);
}

export default randNumberGenerator;