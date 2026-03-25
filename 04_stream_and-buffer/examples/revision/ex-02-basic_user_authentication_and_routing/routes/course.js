import cookie from "cookie";
import fs from "fs";
import url from "url";

const loadCourseDetailsPage = (req, res) => {
  const sendErrorRedirect = (message) => {
    res.statusCode = 302;
    res.setHeader('Location', `/?error=${encodeURIComponent(message)}`);
    res.end();
  };

  const {id} = url.parse(req.url, true, true).query;

  if(!id){
    return sendErrorRedirect("***invalid course id!");
  }

  const cookies = cookie.parseCookie(req.headers.cookie || '');
  const loggedInUser = cookies["loggedInUsers"];

  fs.readFile("./public/courses.json", "utf-8", (err, data) => {
    if(err){
      return sendErrorRedirect("***unable to read the 'courses.json' file!");
    }
    
    let courses;
    try{
      courses = data ? JSON.parse(data) : [];
    }catch(er){
      return sendErrorRedirect("***invalid data format!");
    }

    const course = courses.find(crs => crs.id === Number(id));
    if(!course){
      return sendErrorRedirect("***no such course is found!");
    }

    res.setHeader('Content-Type', 'text/html');
    res.write(`<!DOCTYPE html>
            <html>
              <head>
                <title>Home page</title>
              </head>
              <body>
                <h1>Home page</h1>
                <div>`);
    res.write(`<div class=''>
                <div class='course-image'>
                  <img src='${course.image}' />
                </div>
                <div>
                  <h1 class='course-title'>${course.name}</h1>
                  <p class='course-topics'>
                    <h4>Course Topics</h4>
                    <ul>
                      ${course.topics
                        .map((topic) => {
                          return `<li>${topic}</li>`;
                        })
                        .join("")}
                    </ul>
                  </p>
                  <p class=''>Course duration: <strong>${course.duration} months</strong></p>
                  <h3 class=''>Rs. ${Math.round((course.fee * (100 - course.discount)) / 100)} <strike>${course.fee}</strike></h3>
                  <h4 class=''>Rating: ${course.rating} (${course.no_of_enrollment} enrollments so far)</h4>
                  <h3 class=''>${new Date(course.next_batch_starts_from).getUTCMilliseconds() > Date.now() ? `The batch is starting from ${new Date(course.next_batch_starts_from).getUTCDate()}` : "the batch was already started"}</h3>
                  <p>
                    ${
                      loggedInUser
                        ? `
                    <form action='/add-to-cart' method='POST'>
                      <input type='hidden' name='courseID' value='${course.id || ""}'>
                      <button type='submit' disabled='${new Date(course.next_batch_starts_from).getUTCMilliseconds() > Date.now() ? false : true}'>Add to Cart</button>
                    </form>
                    `
                        : `<a href='/login?message=${encodeURIComponent("***please log in at first!")}'>Add to Cart</a>`
                    }
                  </p>
                </div>
              </div>`);
    res.write(`</div>
              </body>
            </html>`);
    return res.end();
  })
}

export default loadCourseDetailsPage;