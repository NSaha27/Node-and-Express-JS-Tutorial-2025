/*
  Title: Handle Routes 
  Description: Here will be an object of all the routes, where path names will be keys and their respective handler functions will be the values. 
  Author: Niladri Saha
  Date: 09-04-2025
*/

// internal dependencies
import routeHandler1 from './handlers/routeHandlers/notFoundRouteHandler.js';
import routeHandler2 from './handlers/routeHandlers/sampleRouteHandler.js';

// setting different routes and their respective handler functions
const routes = {
  "sample": routeHandler2.sampleRouteHandler,
  "404": routeHandler1.notFoundRouteHandler
};

export default routes;