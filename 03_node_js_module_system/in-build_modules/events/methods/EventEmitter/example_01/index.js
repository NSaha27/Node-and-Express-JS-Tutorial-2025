import fs from "fs";
import path from "path";
import Readline from "readline/promises";
import Emitter from "./eventEmitters.js";

const filePath = path.join(process.cwd(), "customers/customer.json");



      function registerACustomer({cid, cname, caddress, cphone, cemail, cpassword}){
        if(cid.length > 0 && cname.length > 0 && caddress.length > 0 && cphone.length > 0 && cemail.length > 0 && cpassword.length > 0){
          if(!fs.existsSync(filePath)){
            fs.writeFile(filePath, JSON.stringify([{cid, cname, caddress, cphone, cemail, cpassword}]), (err) => {
              if(err){
                throw new Error("*unable to register the customer, error:" + err.message);
              }
              console.log("*registration successful!");
              return true;
            })
          }else{
            fs.readFile(filePath, "utf-8", (err, data) => {
              if(err){
                throw new Error("*unable to fetch the customer registration data!");
              }
              const customers = JSON.parse(data);
              const numOfCusts = customers.filter((cust, indx, arr) => cust.cid === cid && cust.cemail === cemail);
              if(numOfCusts.length > 0){
                console.error("*customer with the same ID or Email is already registered!");
                return false;
              }else{
                const newCustObj = {cid, cname, caddress, cphone, cemail, cpassword};
                customers.push(newCustObj);
                fs.writeFile(filePath, JSON.stringify(customers), (err2) => {
                  if(err2){
                    throw new Error("*unable to register the customer, error:" + err2.message);
                  }
                  console.log("*registration successful!");
                  return true;
                })
              }
            })
          }
        }else{
          console.error("*all fields are required!");
          return false;
        }
      }

      function checkCustLogin({cid, cpassword}){
        if(!fs.existsSync(filePath)){
          console.error("*login info doesn't exist!");
          return false;
        }
        fs.readFile(filePath, "utf-8", (err, data) => {
          if(err){
            throw new Error(`*unable to get the content of the login info file, error: ${err.message}`);
          }else{
            const customers = JSON.parse(data);
            const doesCustExist = customers.filter((cust, indx, arr) => cust.cid === cid && cust.cpassword === cpassword);
            console.log(doesCustExist);
            if(doesCustExist.length > 0){
              console.log("*login successful!");
              return true;
            }else{
              console.error("*invalid login credentials!");
              return false;
            }
          }
        })
      }

const products = [
  {
    productName: "miniket rice",
    productCategory: "rice",
    productPrice: 52.0
  },
  {
    productName: "basmati rice",
    productCategory: "rice",
    productPrice: 110.0
  },
  {
    productName: "dudherswar rice",
    productCategory: "rice",
    productPrice: 70.0
  },
  {
    productName: "govinda bhog rice",
    productCategory: "rice",
    productPrice: 100.0
  },
  {
    productName: "mustered oil",
    productCategory: "oil",
    productPrice: 145.0
  },
  {
    productName: "soyabean oil",
    productCategory: "oil",
    productPrice: 118.0
  },
  {
    productName: "rice bran oil",
    productCategory: "oil",
    productPrice: 132.0
  },
  {
    productName: "sunflower oil",
    productCategory: "oil",
    productPrice: 120.0
  },
  {
    productName: "moosur dal",
    productCategory: "dal",
    productPrice: 80.0
  },
  {
    productName: "mung dal",
    productCategory: "dal",
    productPrice: 100.0
  },
  {
    productName: "arahar dal",
    productCategory: "dal",
    productPrice: 90.0
  },
  {
    productName: "toor dal",
    productCategory: "dal",
    productPrice: 70.0
  },
  {
    productName: "chole dal",
    productCategory: "dal",
    productPrice: 80.0
  },
  {
    productName: "matar dal",
    productCategory: "dal",
    productPrice: 90.0
  }
];

      function receiveOrder({orderID, custID, prodName, qty}){
        const orderCost = 0;
        for(let prod of products){
          if(prod.productName === prodName){
            orderCost = prod.productPrice * qty;
            break;
          }
        }
        const orderInfo = {
          oid: orderID,
          cid: custID,
          productName: prodName,
          qty: qty,
          value: orderCost
        };
        if(!fs.existsSync(filePath)){
          return fs.writeFile(filePath, orderInfo, (err) => {
            if(err){
              throw new Error(`*unable to receive the order, error: ${err.message}`);
            }
            console.log("*order received successfully!");
            return true;
          })
        }else{
          fs.readFile(filePath, "utf-8", (err, data) => {
            if(err){
              throw new Error(`*unable to read the file content, error: ${err.message}`);
            }
            const orders = JSON.parse(data);
            orders.push(orderInfo);
            fs.writeFile(filePath, JSON.stringify(orders), (err2) => {
              if(err2){
                throw new Error("*unable to save the orders, error:" + err2.message);
              }
              console.log("*order received successfully!");
              return true;
            })
          })
        }
      }

const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  // perform customer registration
  const cid = await rl.question("-:Customer Registration:-\nEnter the following details -\nEnter customer ID: ");
  const cname = await rl.question("Enter customer name: ");
  const caddress = await rl.question("Enter customer address: ");
  const cphone = await rl.question("Enter customer phone number: ");
  const cemail = await rl.question("Enter customer email ID: ");
  const cpassword = await rl.question("Enter customer password: ");

  const emitter = new Emitter();
  try{
    emitter.on("registerCustomer", registerACustomer);
    emitter.firstEventEmitter({cid, cname, caddress, cphone, cemail, cpassword});
  }catch(e){
    console.error(e.message);
  }

  // perform customer login
  const custID = await rl.question("\n-:Customer Login:-\nEnter customer ID: ");
  const password = await rl.question("Enter password: ");
  try{
    emitter.on("checkLogin", checkCustLogin);
    emitter.secondEventEmitter({cid: custID, cpassword: password});
  }catch(e){
    console.error(e.message);
  }

  // receive an order
  const orderID = await rl.question("\n-:Order Receive:-\nEnter the order ID: ");
  const prodName = await rl.question("Enter product name: ");
  const qty = await rl.question("Enter the quantity of the order: ");
  try{
    emitter.on("receiveOrder", receiveOrder);
    emitter.thirdEventEmitter({orderID, custID, prodName, qty});
  }catch(e){
    console.error(e.message);
  }
})()

/*
// register an event handler for an event
emitter.on("greetSomebody", ({person, greet}) => {
  console.log(`Hello Mr./Ms. ${person}, ${greet}!`);
});


// raise/call the event 
// after 2 seconds
setTimeout(() => {
  emitter.emit("greetSomebody", {
    person: "John Smith",
    greet: "wish you a very good morning"
  })
}, 2000
);
*/