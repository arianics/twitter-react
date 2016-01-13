var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Twitter = require('node-tweet-stream');

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile('app/index.html');
});

app.use(express.static('app'));

var io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('tweet', function (data) {
    console.log(data);
  });
});

var t = new Twitter({
    consumer_key: 'BNeCOJYbXjiLCJZ7jiVroaSE1',
    consumer_secret: 'UHsotkw7h4JVINozdVgq2UdjhfWlkQYIcQF39fp0c9EomN8ObV',
    token: '2663713986-csn32g7a5jwto73sPXoO4CazqB258LHNfb0MEeZ',
    token_secret: 'YVsZUPxv2HTOdYo3kSiFN8Nb2OLi5toLstqtiRC4EXetH'
  });
 
t.on('tweet', function (tweet) {
  io.emit('tweet', tweet);
});

t.on('error', function (err) {
  console.log('Oh no');
});

t.track('pizza');
