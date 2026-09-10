import http from "node:http";

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = new URL(req.url);

  const { protocol, hostname, port, pathname, searchParams } = url;

  const HttpAgent = new http.Agent({
    keepAlive: true,
    maxSockets: 10,
    maxFreeSockets: 2,
    timeout: 60000,
  });

  if (pathname === "/" && method === "GET") {
    const options = {
      protocol: "https",
      hostname: "://www.dummyjson.com",
      path: "/products",
      method: "GET",
      agent: HttpAgent,
    };
    const request = http.request(options, (resp) => {
      const body = "";
      resp.on("data", (chunk) => {
        body += chunk;
      });
      resp.on("end", () => {
        try {
          const products = JSON.parse(body);
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/javascript");
          return res.end(products);
        } catch (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain");
          return res.end("Invalid JSON data!");
        }
      });
    });
    request.on("error", (err) => {
      console.error(err.message);
    });
    request.end();
  } else if (pathname === "/add-product" && method === "POST") {
    const data = {
      title: "Boat Earbuds 18",
    };
    const options = {
      protocol: "https",
      hostname: "://www.dummyjson.com",
      path: "/products/add",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
      },
      agent: HttpAgent,
    };
    const request = http.request(options, (resp) => {
      const respData = "";
      resp.on("data", (chunk) => {
        respData += chunk;
      });
      resp.on("end", () => {
        try {
          const result = JSON.parse(respData);
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/javascript");
          return res.end(result);
        } catch (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain");
          return res.end("Invalid JSON data!");
        }
      });
    });
    request.on("error", (err) => console.error(err.message));

    request.write(data);
    request.end();
  } else if (pathname === "/edit-product" && method === "PUT") {
    // write product update code here...
  } else if (pathname === "/delete-product" && method === "DELETE") {
    // write product delete code here...
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    return res.end("404 page not found!");
  }
});

server.listen(3000, (err) => {
  if (err) {
    console.error("Unable to start the server, error: " + err.message);
  }
});
