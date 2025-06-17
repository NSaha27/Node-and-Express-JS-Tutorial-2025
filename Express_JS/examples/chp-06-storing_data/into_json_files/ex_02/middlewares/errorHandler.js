function errorHandler(err, req, res, next){
  if(res.headersSent){
    return next("header was already sent to the client!");
  }else{
    if(err && err.statusCode !== 500){
      return next(err.stack);
    }else{
      res.status(500);
      return next("internal server error!");
    }
  }
}

export default errorHandler;