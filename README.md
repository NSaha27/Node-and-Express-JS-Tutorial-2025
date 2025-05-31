**What is Node JS?**

Node JS is a Javascript runtime environment built on google chrome’s V8 Javascript engine, which is used to run javascript programs outside of the browser.

**Why Node JS is used?**

In a client-server architecture, mainly what happens is – when we search something or make any request, then a request is sent from client browser to server. At server Node JS exists which handles that incoming request and generates a response (with or without the help of database) against that request and sends that response to the client browser.

So, in short, Node JS handles the backend server like JAVA or ASP.net or PHP etc.

**Who developed Node JS?**

A google engineer named “Ryan Dahl” developed Node JS.

He wrote a software in C++ and added google’s V8 javascript engine with it to run any Javascript code in it and this way he created Node JS. So, Node JS is a combination of C++ and V8 Javascript engine.

**How DNS work?**

**Domain Name Entry:** Here user types a domain(example \- www.example.com) into the browser.

**DNS Query:** The browser sends a DNS query to resolve the domain into an IP address.

**DNS Server:** Provides the correct IP address for the domain.

**Browser connects:** The browser uses the IP address to connect to the web server and loads the website.

**Node JS Modules?**

There are 3 type of modules Node JS has, like –

1) Built-in modules,  
2) Third-party modules  
3) Personal modules

**Personal modules** are those modules which are created by us.

**Third-party modules** are those modules which are created by any third-party. They are like any functions or libraries which are to be imported in our applications.

**Ex.** Express js.

**Built-in modules** are those modules which are in-build in Node JS.

**Ex.** 

	http \-\> this module is used to connect our application with server and send http requests.

	https \-\> this module does the same job as http module but when sending requests it uses encryption.

	Path \-\> this module helps interact with file path.

	OS \-\> this module helps interact with our system’s OS.

	fs \-\> this module handles file I/O.

	utility/util \-\> this module provides utility support to our application. 

**Using different built-in modules :-**

**OS module –**

At first we need to import this module to use it in our application, to import OS module use –

const os \= require(“os”);

Then to get different information about OS use different methods of “os” object, like –

To get information about –

1. User, use – os.userInfo(),  
2. System’s uptime in seconds, use – os.uptime(),  
3. OS type, use – os.type(), (result – Linux on Linux OS, Darwin on MacOS, Windows\_NT on Windows OS),  
4. OS released version, use – os.release(),  
5. Total memory available in our system, use – os.totalmem() (in bytes),  
6. Free memory available in our system, use – os.freemem() (in bytes),  
7. etc.

**PATH module –**

At first we need to import this module in our application like this –

Const path \= require(“path”);

Then to access different methods of “path” object we need –

1. To get separator of a path, use – path.sep(),  
2. To create a path by joining different segments, use – path.join(“segment\_1”, “segment\_2”, “segment\_3”, …, “main file with extension”);  (result – [/segment\_1/segment\_2/](http://domain/segment%201/segment%202/) segment\_3/.../main file with extension),  
3. To get relative path, use – path.basename(full\_path);  (result – for example – “test.txt” or “image.png” or “info.pdf” etc.),  
4. To get absolute path, use – path.resolve(\_\_dirname, ‘segment\_1’, ‘segment\_2’, … , ‘test.txt’);  (result –/full\_directory\_path/segment\_1/segment\_2/.../test.txt),

**FS module \-**

**HTTP module \-**

**HTTPS module \-**

**EVENTS module \-**

**CRYPTO module \-**

**URL module \-**

**What is npm?**

Npm stands for Node Package Manager. It is a third party package installer of Node JS which gets installed with the installation of Node JS in our system.

**How to check the version of npm?**

Write  “npm \--version” or “npm \--v” in terminal to check the version of npm. Note that its version is different from that of Node JS.

**What npm does?**

Npm helps to install mainly two type of packages/dependencies/modules whatever you called. These are –

1) **Local dependencies –** use them only in our current project. To install, use – “npm i \<packageName\>” or “npm install \<packageName\>”.  
2) **Global dependencies –** use them in any project as they are being installed globally. To install, use – “npm install –g \<packageName\>” (for windows) or “sudo npm install –g \<packageName\>” (for Mac).

**What is a Package?**

A package is a group of reusable code or a library.

**What is package.json and what it does?**

Package.json is a manifest file which stores important information (project metadata, version number etc.) relating to our project/package. We can also get an overview of different dependencies/packages we installed in our project from this package.json file.

**How to create package.json file in our project?**

Type – “**npm init**” in terminal (inside our project directory) (step by step method, to skip press enter)

or “**npm init \-y**” in terminal (inside our project directory) (default creation, skipping all unnecessary steps).

**What is versioning?**

Versioning manages different package versions.

**What is Registry?**

A registry is a public storage for open-source packages. ex. \- Express, React, Lodash etc.

**How to push our node project in github depository?**

We need to pass some command in our terminal to push our project in the github repo.

1) git init  
2) git add .      (add an empty repository)(we can also write “git add README.md”)  
3) git commit –m “initial repository”    (we can also change the repository name)  
4) git branch \-M main  
5) git remote add origin [https://github.com/NiladriSaha1992/node-js-tut.git](https://github.com/NiladriSaha1992/node-js-tut.git)  
6) If pull is required \- i) git config pull.rebase true, ii) git pull origin main

7) git push \-u origin main

**What is nodemon?**

nodemon is a dev (development) dependency of Node JS which refreshes our server each time we make any changes to our Node JS code and save it.

We have at first to install nodemon via npm, and for that we have to run the following command in our terminal –

“**npm install \--save-dev nodemon**”

In this way we can install nodemon as a dev dependency.

To use nodemon we have to make a change in package.json file like this –

Under “scripts” property we can either –

1) Add a sub-property called “**dev**” and set “**nodemon file\_name.js**” as its value and in terminal we have to pass this command \- “**npm run dev**”.  
2) Add a sub-property called “**start**” and set “**nodemon file\_name.js**” as its value and in terminal we have to pass this command – “**npm start**”. 

Now, if we save our Node JS code and runs it in a browser and then make any changes to our code and again save it, nodemon will automatically refresh our server and we will see the changes in the browser.

**Request and Response**

**(1) Node Lifecycle and Event Loop \-**

**What is an Event Loop?**

Event Loop is a process to loop an event so that a process never ends or keeps on running.

This Event Loop concept is a key concept in Javascript as well as in Node JS. In Node JS event loop is used in keeping our server running so that any visitor can access our website from anywhere and at any time and can continuously keep requesting and getting responses.

![event-loop\_gohdkk.png][image1]

How to terminate Event Loop forcefully at any position of a program?

To terminate the Event Loop write the following code \-

“process.exit()”

This will terminate the event loop at any position of a program.

Event Loop Sequence \-

The events will be queued and executed by the event loop in the following way \-

1. Any synchronous code  
2. Any microtask (Promises)  
3. Any timer related code (setTimeout(), setInterval() etc.)  
4. Any setImmediate code (Check) (setImmediate())  
5. Any I/O related code (fs.readFile(), fs.writeFile() etc.)  
6. Any Closing operation ([req.on](http://req.on)(“end”), [req.on](http://req.on)(“exit”) etc.)

Request Object \-

If a client sends a request to the server, it goes to the server in the form of an object. This object contains all the request related information, like \- requested URL, request Method, request Headers, Information about the connection (like \- HOST, PORT etc.) etc.

Three main properties of the request object that will be required for any project are \- request.url, request.method, and request.headers etc.
