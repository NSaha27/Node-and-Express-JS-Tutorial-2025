function notFoundErrorHandler(req, res, next){
  if(req.path !== "/" && req.path !== "/home" && req.path !== "/login" && req.path !== "/signup"){
    if(req.accepts === "html"){
      res.status(404).render("404", {pageTitle: "404, page not found!"});
    }
    if(req.accepts === "json"){
      res.status(404).json({status: "404, not found!"});
    }
  }
}

function errorHandler(err, req, res, next){
  if(res.headersSent){
    if(req.accepts("html")){
      return res.redirect("/?msg=*header already sent to the client!");
    }
    if(req.accepts("json")){
      return res.json({status: "*header already sent to the client!"})
    }
  }else{
    if(err.code === "EBADCSRFTOKEN"){
      if(req.accepts("html")){
        return res.status(403).redirect("/?msg=*form tampered with!");
      }
      if(req.accepts("json")){
        return res.status(403).json({status: "*form tampered with!"});
      }
    }else{
      if(err && err.message){
        
      }
    }
  }
}