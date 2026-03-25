import loadCourseDetailsPage from "./course.js";
import loadHomePage from "./home.js";
import { loadLoginPage, login } from "./login.js";
import { loadSignupPage, signup } from "./signup.js";

const router = (req, res) => {
  const method = req.method;
  const path = req.url.split("?")[0];

  if (path === '/signup' && method === 'GET') {
    return loadSignupPage(req, res);
  } else if (path === '/signup' && method === 'POST') {
    return signup(req, res);
  } else if (path === '/login' && method === 'GET') {
    return loadLoginPage(req, res);
  } else if (path === '/login' && method === 'POST') {
    return login(req, res);
  }else if (path === '/course-details' && method === 'GET'){
    return loadCourseDetailsPage(req, res);
  }else if (path === '/' && method === 'GET'){
    return loadHomePage(req, res);
  }
};

export default router;