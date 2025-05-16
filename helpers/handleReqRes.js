import Cookie from "cookies";
import fs from "fs";
import path from "path";

// module scaffolding
const handleReqRes = {};

handleReqRes.loadHomePage = function(req, res, cb){
  const filePath = path.resolve(process.cwd(), "views", "index.html");
  const rs = fs.createReadStream(filePath, "utf-8");
  rs.on("error", (err) => {
    return cb(err.message);
  });
  rs.pipe(res);
};
handleReqRes.loadMensPage = function(req, res, cb){
  const filePath = path.resolve(process.cwd(), "views", "mens.html");
  const rs = fs.createReadStream(filePath, "utf-8");
  rs.on("error", (err) => {
    return cb(err.message);
  });
  rs.pipe(res);
};
handleReqRes.loadWomensPage = function(req, res, cb){
  const filePath = path.resolve(process.cwd(), "views", "womens.html");
  const rs = fs.createReadStream(filePath, "utf-8");
  rs.on("error", (err) => {
    return cb(err.message);
  });
  rs.pipe(res);
};
handleReqRes.loadKidsPage = function(req, res, cb){
  const filePath = path.resolve(process.cwd(), "views", "kids.html");
  const rs = fs.createReadStream(filePath, "utf-8");
  rs.on("error", (err) => {
    return cb(err.message);
  });
  rs.pipe(res);
};
handleReqRes.loadSignupPage = function(req, res, cb){
  const filePath = path.resolve(process.cwd(), "views", "signup.html");
  const rs = fs.createReadStream(filePath, "utf-8");
  rs.on("error", (err) => {
    return cb(err.message);
  });
  rs.pipe(res);
};
handleReqRes.signup = function(req, res, cb){
  const reqBody = [];
  req.on("data", (chunk) => {
    reqBody.push(chunk);
  });
  req.on("end", () => {
    const reqBodyStr = Buffer.concat(reqBody).toString();
    const params = new URLSearchParams(reqBodyStr);
    const jsonObject = Object.fromEntries(params);
    const writeFilePath = path.resolve(process.cwd(), ".data", "customer.json");
    if(fs.existsSync(writeFilePath)){
      fs.readFile(writeFilePath, "utf-8", (err, data) => {
        if(err){
          return cb(err.message);
        }
        const registeredCust = JSON.parse(data);
        if(registeredCust.findIndex(cust => cust.username === jsonObject.username) === -1){
          const customers = [...registeredCust, jsonObject];
          fs.writeFile(writeFilePath, JSON.stringify(customers), (err2) => {
            if(err2){
              return cb(err2.message);
            }
            cb(false);
          })
        }else{
          return cb("customer with this username is already present!");
        }
      })
    }else{
      const customers = [jsonObject,];
          fs.writeFile(writeFilePath, JSON.stringify(customers), (err2) => {
            if(err2){
              return cb(err2.message);
            }
            cb(false);
          })
    }
  })
}

handleReqRes.loadLoginPage = function(req, res, cb){
  const filePath = path.resolve(process.cwd(), "views", "login.html");
  const rs = fs.createReadStream(filePath, "utf-8");
  rs.on("error", (err) => {
    return cb(err.message);
  });
  rs.pipe(res);
};

handleReqRes.login = function(req, res, cb){
  const reqBody = [];
  req.on("data", (chunk) => {
    reqBody.push(chunk);
  });
  req.on("end", () => {
    const reqBodyStr = Buffer.concat(reqBody).toString();
    const params = new URLSearchParams(reqBodyStr);
    const jsonObject = Object.fromEntries(params);
    const writeFilePath = path.resolve(process.cwd(), ".data", "customer.json");
    if(fs.existsSync(writeFilePath)){
      fs.readFile(writeFilePath, "utf-8", (err, data) => {
        if(err){
          return cb(err.message);
        }
        const existingCusts = JSON.parse(data);
        const custFoundAt = existingCusts.findIndex(cust => cust.username === jsonObject.username && cust.password === jsonObject.password);
        if(custFoundAt === -1){
          return cb("invalid username or password!");
        }else{
          const cookie = new Cookie(req, res, {maxAge: 60*60*1000, httpOnly: true});
          cookie.set("username", jsonObject.username);
          cb(false);
        }
      })
    }else{
      return cb("no such file exists!");
    }
  })
}

handleReqRes.loadCustHomePage = function(req, res, cb){
  const filePath = path.resolve(process.cwd(), "views", "customer-home.html");
  const rs = fs.createReadStream(filePath, "utf-8");
  rs.on("error", (err) => {
    return cb(err.message);
  });
  rs.pipe(res);
}

handleReqRes.updateCustomer = function(req, res, cb){
  const reqBody = [];
  req.on("data", (chunk) => {
    reqBody.push(chunk);
  });
  req.on("end", () => {
    const reqBodyStr = Buffer.concat(reqBody).toString();
    const params = new URLSearchParams(reqBodyStr);
    const jsonObject = Object.fromEntries(params);
    const filePath = path.resolve(process.cwd(), ".data", "customer.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if(err){
        return cb(err.message);
      }
      const customers = JSON.parse(data);
      const custFoundAt = customers.findIndex((cust) => cust.username === jsonObject.username);
      if(custFoundAt !== -1){
        customers[custFoundAt] = jsonObject;
        fs.writeFile(filePath, JSON.stringify(customers), (err2) => {
          if(err) return cb(err2.message);
          return cb(false);
        })
      }else{
        return cb("no such customer found!");
      }
    })
  })
}

handleReqRes.loadCartPage = function(req, res, cb){
  const filePath = path.resolve(process.cwd(), "views", "cart.html");
  const rs = fs.createReadStream(filePath, "utf-8");
  rs.on("error", (err) => {
    return cb(err.message);
  });
  rs.pipe(res);
}

handleReqRes.logout = function(req, res, cb){
  try{
    const cookie = new Cookie(req, res);
    cookie.set("username", "");
    return cb(false);
  }catch(er){
    return cb(er.message);
  }
}

handleReqRes.load404Page = function(req, res, cb){
  const filePath = path.resolve(process.cwd(), "views", "404.html");
  const rs = fs.createReadStream(filePath, "utf-8");
  rs.on("error", (err) => {
    return cb(err.message);
  });
  rs.pipe(res);
}

handleReqRes.getCustByUsername = function(req, res, username, cb){
  const filePath = path.resolve(process.cwd(), ".data", "customer.json");
  if(fs.existsSync(filePath)){
    fs.readFile(filePath, "utf-8", (err, data) => {
      if(err){
        return cb(err.message);
      }
      const customers = JSON.parse(data);
      const selectedCusts = customers.filter((cust) => cust.username === username.toUpperCase());
      if(selectedCusts.length > 0){
        return cb(selectedCusts[0]);
      }else{
        return cb("no such customer exists!");
      }
    })
  }
}

export default handleReqRes;
