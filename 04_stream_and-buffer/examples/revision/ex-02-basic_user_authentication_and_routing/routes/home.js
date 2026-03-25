import cookie from "cookie";
import fs from "fs";

const loadHomePage = (req, res) => {
  const sendErrorRedirect = (message) => {
    res.statusCode = 302;
    res.setHeader('Location', `/?error=${encodeURIComponent(message)}`);
    res.end();
  }

  const cookies =  cookie.parseCookie(req.headers.cookie || '');
  const loggedInUser = cookies["loggedInUser"];

  fs.readFile('./public/courses.json', "utf-8", (er, data) => {
    if (er) {
      console.error(er);
      return sendErrorRedirect(
        `***unable to read the file!`,
      );
    } 

    let courses;
    try{
      courses = data ? JSON.parse(data) : [];
    }catch(err){
      console.error(err);
      return sendErrorRedirect("***invalid data store format!");
    }
     
    res.setHeader("Content-Type", "text/html");
    res.write(`<!DOCTYPE html>
            <html>
              <head>
                <title>Home page</title>
              </head>
              <body>
                <h1>Home page</h1>
                <div>
            `);
    if (courses.length > 0) {
      for (let course of courses) {
        res.write(`<div class='card'>
                  <div class='card-header'>
                    <img src='${course.image}' alt='${course.name}' />
                  </div>  
                  <div class='card-body'>
                    <h3 class=''>${course.name}</h3>
                    <p class=''>Duration: ${course.duration} months</p>
                    <p class=''>Rating: ${course.rating}</p>
                    <p class=''>Course fee: Rs.<strong>${Math.round((course.fee * (100 - course.discount)) / 100)}/-</strong> <strike>${course.fee}</strike> only</p>
                    <p class=''>${course.no_of_enrollment} enrollments so far</p>
                    <p class=''>next batch will be starting from ${course.next_batch_starts_from} onwards.</p>
                    <p class=''>
                      ${course.topics
                        .map((topic) => {
                          return `<span class='topic'>${topic}</span>`;
                        })
                        .join("")}
                    </p>
                  </div>
                  <div class='card-footer'>
                    <a href='/course-details?id=${encodeURIComponent(course.id)}' class=''>Details</a>
                    ${loggedInUser ? `
                    <form action='/add-to-cart' method='POST'>
                      <input type='hidden' name='courseID' value='${course.id || ""}'>
                      <button type='submit'>Add to Cart</button>
                    </form>
                    ` : `<a href='/login?message=${encodeURIComponent("***please log in at first!")}'>Add to Cart</a>`}
                  </div>
                </div>`);
      }
    } else {
      res.write(
        "<h3 class=''>we are working on releasing our curated courses!</h3>",
      );
    }
    res.write(`</div>
              </body>
            </html>`);
    return res.end();
  });
}

export default loadHomePage;