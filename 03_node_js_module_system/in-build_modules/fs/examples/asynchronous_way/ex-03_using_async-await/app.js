// HANDLE FILE OPERATIONS ASYNCHRONOUSLY USING ASYNC-AWAIT
const fs = require("fs");
const path = require("path");

const fileName1 = "clients.txt";
const filePath1 = path.join(__dirname, "files", fileName1);

/*
  fs.promises.writeFile(filePath, data, option)
*/

/*
const client1 = `ID : 1\ndate : 06/06/2026\nname : Arunava Das\nproblem_heading : upper-right abdominal pain\nproblem_details : there is a continuous mild pain at the upper-right abdominal area for 7 days\nsuspected_cause : fatty-liver\nmedicine_suggested : (Rabeprazol Sodium 20mg + Domparidone 30mg) (1 capsule before breakfast, for 10 days), (Pancreatin 170mg + Sodium Tauroglycocholate 65mg) (1 tablet after lunch and dinner, 10 days), (Tricholine Citrate + Cyproheptadine Hydrochloride Syrup) (10ml before dinner, 6 months)\ntest_suggested : USG W.A.\nnext_visit : 16/06/2026\n\n`;

async function saveRecord(filepath, data){
  try{
    await fs.promises.writeFile(filepath, data, "utf-8");
    console.log("*client details were recorded successfully!");
    return true;
  }catch(err){
    console.error("*failed to record the client data, error:", err.message);
    return false;
  }
}

saveRecord(filePath1, client1);
*/

/*
  fs.promises.readFile(filePath, option)
*/

/*
async function getClientDetails(filepath){
  try{
    const clients = await fs.promises.readFile(filepath, "utf-8");
    if(clients.length === 0){
      console.log("*no client was found!");
      return false;
    }
    console.log(clients);
  }catch(err){
    console.error("*failed to get client records, error:", err.message);
    return false;
  }
}

getClientDetails(filePath1);
*/

/*
  fs.promises.appendFile(filePath, data, option)
*/

/*
const client2 = `ID : 2\ndate : 08/06/2026\nname : Savita Duggar\nproblem_heading : headache, sneezing nose\nproblem_details : there is fever, headache, sneezing nose symptoms for last 4 days\nsuspected_cause : viral fever\nmedicine_suggested : (Rabeprazol Sodium 20mg + Domparidone 30mg) (1 capsule before breakfast, for 7 days), (Paracetamol 650) (1 tablet after lunch and dinner, 5 days), (Mox CV 500) (1 tablet after lunch and dinner, 5 days), (2% Povidone Iodine solution) (gargle thrice a day taking 10ml of this solution each time)\ntest_suggested : \nnext_visit : 15/06/2026\n\n`;

async function appendNewClient(){
  try{
    fs.promises.appendFile(filePath1, client2, "utf-8");
    console.log("***new client details were added successfully!");
  }catch(err){
    console.error("***failed to add new client data, error:", err.message);
    return false;
  }
}
appendNewClient();
*/

/*
  fs.promises.unlink()
*/

async function removeAllClientsData(){
  try{
    fs.promises.unlink(filePath1);
    console.log("***all client data were deleted!");
  }catch(err){
    console.error("***failed to delete client data, error:", err.message);
    return false;
  }
}
removeAllClientsData();