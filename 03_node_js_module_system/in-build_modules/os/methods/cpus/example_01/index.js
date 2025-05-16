/*
  os.cpus()
  ----------

  This method returns an array containing information about the cpus of this system.
*/

import os from "os";

const currentCPUs = os.cpus();
console.log(currentCPUs);