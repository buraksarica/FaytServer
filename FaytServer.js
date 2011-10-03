var clientFiles = new static.Server('./FaytClient');

var httpServer = http.createServer(function(request, response) {
    request.addListener('end', function () {
        clientFiles.serve(request, response);
    });
});
httpServer.listen(9999);

var webSocket = socketIO.listen(httpServer);
webSocket.on('connection', function(client) {
    client.send('Please enter a user name ...');

    var userName;
    client.on('message', function(message) {
        if(!userName) {
            userName = message;
            webSocket.broadcast(message + ' has entered the zone.');
            return;
        }

        var broadcastMessage = userName + ': ' + message;
        webSocket.broadcast(broadcastMessage);
    });

    client.on('disconnect', function() {
        var broadcastMessage = userName + ' has left the zone.';
        webSocket.broadcast(broadcastMessage);
    });
});