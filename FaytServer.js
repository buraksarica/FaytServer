var http = require('http');
var connect = require('connect');

var server = connect.createServer(
  connect.logger()
  , connect.static(__dirname + '/FaytClient')
).listen(80,"10.228.182.253");

var webSocket = require('socket.io').listen(1337,"10.228.182.253");
webSocket.on('connection', function(client) {
    client.send('Please enter a user name ...');

    var userName;
    client.on('message', function(message) {
        if(!userName) {
            userName = message;
            webSocket.broadcast.emit(message + ' has entered the zone.');
            return;
        }

        var broadcastMessage = userName + ': ' + message;
        webSocket.broadcast.send(broadcastMessage);
    });

    client.on('disconnect', function() {
        var broadcastMessage = userName + ' has left the zone.';
        webSocket.broadcast.send(broadcastMessage);
    });
});
