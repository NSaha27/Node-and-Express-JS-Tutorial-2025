function errorHandler(err, req, res, next){
  if(res.headersSent){
    next("*header was already sent to the client!");
  }else{
    if(err && err.code === "ENOENT"){
      next("*file does't exist!");
    }else{
      if(err && err.statusCode !== 500){
        next(err.stack);
      }else{
        next("*internal server error!");
      }
    }
  }
}

export default errorHandler;