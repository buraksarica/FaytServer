var http = require('http');
var connect = require('connect');

var server = connect.createServer(
  connect.logger()
  , connect.static(__dirname + '/FaytClient')
).listen(80,"10.228.182.253");