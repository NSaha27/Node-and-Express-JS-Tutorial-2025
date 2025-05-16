/*
  os.totalmem()
  --------------
  This method calculates the total memory size of our system in bytes and returns it.
*/

import os from 'os';

console.log(`The total memory size of this system in GB is : ${(os.totalmem() / (1024*1024*1024)).toFixed(1)}`);