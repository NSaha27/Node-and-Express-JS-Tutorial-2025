import EventEmitter from "events";

class Emitter extends EventEmitter{
  firstEventEmitter({cid, cname, caddress, cphone, cemail, cpassword}){
    this.emit("registerCustomer", {cid, cname, caddress, cphone, cemail, cpassword});
  };
  secondEventEmitter({cid, cpassword}){
    this.emit("checkLogin", {cid, cpassword});
  };
  thirdEventEmitter({orderID, custID, prodName, qty}){
    this.emit("receiveOrder", {orderID, custID, prodName, qty});
  }
}

export default Emitter;