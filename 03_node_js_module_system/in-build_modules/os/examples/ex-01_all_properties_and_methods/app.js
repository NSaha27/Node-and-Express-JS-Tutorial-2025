// import build-in modules
const os = require("os");

/*
 os.platform() - returns the operating system platform of the current system
 
 usage - useful for writing cross-platform applications.
*/
const platform = os.platform();
console.log(platform);

// ex-01
switch(platform){
  case "win32":
    console.log("This is a 'Window' system.");
    break;
  case "linux":
    console.log("This is a 'Linux' system.");
    break;
  case "darwin":
    console.log("This is a 'Machintosh' system.");
    break;
  default:
    console.log("This is a random system.");
}

/*
  os.arch() - Returns the CPU Architecture (ex. 'x64', 'arm', etc.)

  usage - Helps optimize code for specific architecture
*/
const architecture = os.arch();
console.log(architecture);

// ex-01
if(architecture === "x64"){
  console.log("This system has a 'x64' based processor.");
}else if(architecture === "arm"){
  console.log("This system has an 'arm' based processor.");
}else if(architecture === "arm64"){
  console.log("This system has an 'arm64' based processor.");
}else{
  console.log("This system has an unknown processor architecture.");
}

/*
  os.freemem() - returns the amount of free system memory (in bytes)

  usage - Useful for monitoring system performance
*/
const freeSysMemory = os.freemem();
console.log("Free memory (in bytes):", freeSysMemory);

// ex-01
const freeMemInGB = os.freemem() / (1024*1024*1024);
if(freeMemInGB >= 8){
  console.log("you can install this software in your system.");
}else{
  console.log(
    "you must have atleast 8GB free memory space to install this software in your system.",
  );
}

/*
  os.totalmem() - Returns the total system memory in bytes

  usage - Provides insights into system's capacity
*/
const totalSysMemory = os.totalmem();
console.log("Total memory (in bytes):", totalSysMemory);

//ex-01
const totalSysMemInGB = totalSysMemory / (1024*1024*1024);
if(totalSysMemInGB >= 8){
  console.log("you can install this operating system without any hesitation.");
}else{
  console.log("atleast 8GB of total memory is required to install this operating system.");
}

/*
  os.uptime() - Returns the system uptime in seconds

  usage - Commonly used in logging or monitoring tools. Useful for storing temporary data.
*/
const uptime = os.uptime();
console.log("System uptime (in seconds):", uptime);
console.log("System uptime (in hours)(approx.):", Math.round(uptime / 3600));

/*
  os.homedir() - Returns the home directory of the current user

  usage - used to locate user-specific files
*/
const usersHomeDir = os.homedir();
console.log("User's home directory:", usersHomeDir);

/*
  os.hostname() - Returns the hostname of the operating system as a string

  usage - useful for logging and identifying machines in network
*/
const userHostname = os.hostname();
console.log("Host name of the user's system:", userHostname);

/*
  os.networdInterfaces() - Returns an object with all the details of a network interface

  usage - Helps in network diagnostics and configuration.
*/
const hostNetworkInterface = os.networkInterfaces();
console.log("user's network details:", hostNetworkInterface);

const network = Object.keys(os.networkInterfaces())[0];
const userIPAddressDetails = hostNetworkInterface[network].pop();
console.log("IP address details of user's system:", userIPAddressDetails);

/*
  os.cpus() - Returns details about each logical CPU/core

  usage - Helps write optimized code for multi-core processing
*/
const usersCPUDetails = os.cpus();
console.log("CPU and Core details of user's system:", usersCPUDetails);

const cores = os.cpus().map(cpu => cpu.times);
const processor = {model: os.cpus()[0]["model"], speed: os.cpus()[0]["speed"]};
console.log("details of the CPU:");
console.log(`Processor model: ${processor["model"]}\nProcessor speed (GHz): ${processor["speed"]}`);
console.log(`details of ${cores.length} cores:`);
console.log(cores);

/*
  os.tmpdir() - Returns the operating system's default directory for temporary files as a string
*/
const tempDirectory = os.tmpdir();
console.log("OS's default directory for tem. files:", tempDirectory);