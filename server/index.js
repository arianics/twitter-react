var express = require('express');
var serveStatic = require('serve-static');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Twitter = require('node-tweet-stream');
var port = 3000;

app.use(serveStatic(__dirname + '/../app'));
server.listen(port, function(){
    console.log("Server listening on: http://localhost:%s", port);
});

var t = new Twitter(twitterConfig);

io.on('connection', function (socket) {
  socket.on('tweet', function (data) {
    console.log(data);
  });
});

t.on('tweet', function (tweet) {
  io.emit('tweet', tweet);
//  console.log(tweet);
});

t.on('error', function (err) {
  console.log('Oh no');
});

t.track('pizza');
