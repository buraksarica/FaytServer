var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World Nodejs run on Amazon EC2 by fyhao\n');
}).listen(1337,"10.228.182.253");
console.log('Server running on Amazon EC2');