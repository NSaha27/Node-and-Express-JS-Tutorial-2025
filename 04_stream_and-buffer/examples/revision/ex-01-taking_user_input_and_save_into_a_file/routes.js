import fs from "fs";

const routeHandler = (req, res) => {
  const url = req.url;
  const method = req.method; 

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head><title>user input form</title></head>");
    res.write("<body>");
    res.write("<h2>User Message</h2>");
    res.write("<div>");
    res.write("<form action='/message' method='POST'>");
    res.write(
      "<p><input type='text' name='username' placeholder='Enter your name...' /></p>",
    );
    res.write(
      "<p><textarea name='message' placeholder='Enter your message...' rows='10'></textarea></p>",
    );
    res.write("<p><button type='submit'>Send</button></p>");
    res.write("</form>");
    res.write("</div>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (url === "/message" && method === "POST") {
    const data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    return req.on("end", () => {
      try {
        const parsedData = Buffer.concat(data).toString("utf-8");
        const [username, message] = parsedData.split("&");
        let [unameKey, unameValue] = username.split("=");
        let [msgKey, msgValue] = message.split("=");
        unameValue = unameValue.replaceAll("+", " ");
        msgValue = msgValue.replaceAll("+", " ");
        msgValue = msgValue.replaceAll("%2C", ",");
        fs.open("./public/message.txt", "a+", (err, fd) => {
          if (err) {
            throw new Error(
              `***unable to open the file, error: ${err.message}`,
            );
          } else {
            fs.writeFile(
              fd,
              `username:${unameValue}\nmessage:${msgValue}\n`,
              (er) => {
                if (er) {
                  throw new Error(
                    `***unable to save the username and message, error: ${er.message}`,
                  );
                } else {
                  console.log(
                    "***username and message of the user have been saved successfully!",
                  );
                  fs.close(fd);

                  // redirect to home page
                  res.statusCode = 302;
                  res.setHeader("Location", "/");
                  return res.end();
                }
              },
            );
          }
        });
      } catch (err) {
        console.error(err.message);

        // redirect to home page
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      }
    });
  }
}

export default routeHandler;