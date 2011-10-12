var http = require('http');
var connect = require('connect');

var server = connect.createServer(
  connect.logger()
  , connect.static(__dirname + '/FaytClient')
).listen(80,"10.228.182.253");

var io = require('socket.io').listen(1338,"10.228.182.253");

io.sockets.on('connection', function (socket) {
  socket.on('message', function (msg) { io.sockets.emit(msg);});
  socket.on('disconnect', function () { });
});


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World Nodejs run on Amazon EC2 by fyhao\n');
}).listen(1337,"10.228.182.253");
console.log('Server running on Amazon EC2');