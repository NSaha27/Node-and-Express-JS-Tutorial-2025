/*
  Title: Sample route handler 
  Description: Here will be a router-handler function that will handle any sample route
  Author: Niladri Saha
  Date: 09-04-2025
*/

// module scaffolding
const routeHandler = {};

routeHandler.notFoundRouteHandler = (reqProperties, cb) => {
  cb(404, {
    message: '404 not found'
  })
};

export default routeHandler;