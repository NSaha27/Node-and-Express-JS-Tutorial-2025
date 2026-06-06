// FILE HANDLING USING PROMISES
const fs = require("fs");
const path = require("path");

const fileName1 = "plans.txt";
const filePath1 = path.join(__dirname, "files", fileName1);

/*
  fs.promises.writeFile(filePath, data, option) - asynchronously writes data to a file. Creates a new file if the file does not exist, or replaces an existing file's data.

  Parameters :
  1. filePath : The absolute path of the file to be written
  2. data : The data to be written into the file
  3. option : other options relating to writing the file, like data encoding type, ex. "utf-8", "ascii", "hex", etc.
*/

/*
const plan1 = `ID : #UNL5GSILVER\nname : silver\nfacility : unlimited free calls, unlimited data over any 5G network, limited 2GB data over 4G network, free access to 2 OTT platforms(Live TV, Cinema), free 20GB cloud storage, free tunes\nvalidity : 28 days\ncost : ${349.00}\n\n`;
const plan2 = `ID : #UNL5GGOLD\nname : gold\nfacility : unlimited free calls, unlimited data over any 5G network, limited 3GB data over 4G network, free access to 5 OTT platforms(Live TV, CoolSter, Z5, ChoiHoi, SnyLiv), free 20GB cloud storage, free tunes\nvalidity : 28 days\ncost : ${399.0}\n\n`;

fs.promises.writeFile(filePath1, [plan1, plan2], "utf-8")
  .then(res => {
    console.log("*two new plans were recorded successfully!");
  })
  .catch(err => {
    console.log("*failed to write new plans to the file, error:", err.message);
    return false;
  })

*/

/*
  fs.promises.readFile(filePath, option) - Asynchronously reads the entire content of a file and returns it in various formats, based on the encoding selected.
*/

/*
fs.promises.readFile(filePath1, "utf-8")
  .then(res => {
    console.log("Here is the file content:");
    console.log(res.split("\n\n"));
  })
  .catch(err => {
    console.error("*failed to read the file, error:", err.message);
    return false;
  })
*/

/*
  fs.promises.appendFile(filePath, data, option) - asynchronously appends data at the end of an existing file, or creates a file (if not exists) and appends data into it.
*/

/*
const plan3 = `ID : #UNL5GPLATINUM\nname : platinum\nfacility : unlimited free calls, unlimited data over any 5G network, limited 2.5GB data over 4G network, free access to 12 OTT platforms(like, Live TV, CoolSter, Z5, ChoiHoi, SnyLiv, Hangam, NetFlex, Amz Prime, FanCd, Sanorama, Cinema, etc.), free 20GB cloud storage, free tunes\nvalidity : 28 days\ncost : ${449.0}\n\n`;

fs.promises.appendFile(filePath1, plan3, "utf-8")
  .then(res => {
    console.log("*the new plan has been recorded successfully!");
  })
  .catch(err => {
    console.error("*failed to append new data to the file, error:", err.message);
    return false;
  })

*/

/*
  fs.promises.unlink(filePath) - Deletes a file asynchronously.
*/

fs.promises.unlink(filePath1)
  .then(res => {
    console.log("*the file has been deleted successfully!");
  })
  .catch(err => {
    console.error("*failed to delete the file, error:", err.message);
    return false;
  })