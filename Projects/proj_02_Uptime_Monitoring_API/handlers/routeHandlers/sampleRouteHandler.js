/*
  Title: Sample route handler 
  Description: Here will be a router-handler function that will handle any sample route
  Author: Niladri Saha
  Date: 09-04-2025
*/

// module scaffolding
const routeHandler = {};

routeHandler.sampleRouteHandler = (reqproperties, cb) => {
  cb(200, {
    message: 'Welcome to raw node js "uptime monitoring" project'
  });
};

export default routeHandler;