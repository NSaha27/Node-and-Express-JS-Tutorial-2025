/*
  os.networkInterfaces()
  -----------------------
  This method returns the network interface that has a network address
*/

import os from "os";

// console.log(os.networkInterfaces());

const networks = os.networkInterfaces();

console.log(networks["Wi-Fi"][3]["address"], networks["Wi-Fi"][3]["netmask"]);