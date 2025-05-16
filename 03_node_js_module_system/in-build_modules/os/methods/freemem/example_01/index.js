/*
  os.freemem()
  -------------

  This method returns the number of free memory of the system.
*/

import os from "os";

console.log(`The number of free memory available in this system : ${Math.round(os.freemem() / (1024 * 1024 * 1024), 1)}GB`);