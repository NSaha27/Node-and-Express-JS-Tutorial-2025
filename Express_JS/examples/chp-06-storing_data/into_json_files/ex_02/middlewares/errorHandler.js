function errorHandler(err, req, res, next){
  if(res.headersSent){
    return next("header was already sent to the client!");
  }else{
    if(err && err.code === "ENOENT"){
      return next("*the requested file doesn't exist!");
    }else{
      res.status(500);
      return next(err.stack);
    }
  }
}

export default errorHandler;