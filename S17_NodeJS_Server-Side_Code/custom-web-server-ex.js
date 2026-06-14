const http = require("http");

function handleRequest(request, response) {
  if (request.url === "/currenttime") {
    // response to url localhost:3000/currenttime request
    response.statusCode = 200;
    response.end("<h1>" + new Date().toISOString() + "</h1>");
  } else if (request.url === "/") {
    // response to url localhost:3000 request
    response.statusCode = 200;
    response.end("<h1>Hi Hommies, I'm Alien</h1>");
  }
}

const server = http.createServer(handleRequest);

server.listen(3000);
