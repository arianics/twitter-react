'use strict';

var express = require('express');
var serveStatic = require('serve-static');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Twitter = require('node-tweet-stream');
var twitterConfig = require('./twitter-config.json');
var port = 3000;
var filters = {};

app.use(serveStatic(__dirname + '/../app'));
server.listen(port, function() {
  console.log('Server listening on: http://localhost:%s', port);
});

app.get('/addTag/:tag', function(req, res) {
  if (filters[req.params.tag]) {
    res.end('The ' + req.params.tag + ' tag already exists!');
    return;
  }
  t.track(req.params.tag);
  filters[req.params.tag] = true;
  console.log(filters);
  res.end('Added tag ' + req.params.tag);
});
app.get('/removeTag/:tag', function(req, res) {
  if (!filters[req.params.tag]) {
    res.end('The ' + req.params.tag + ' tag doesn\'t exist!');
    return;
  }
  t.untrack(req.params.tag);
  filters[req.params.tag] = false;
  res.end('Removed tag ' + req.params.tag);
});
var t = new Twitter(twitterConfig);

io.on('connection', function(socket) {
  socket.on('tweet', function(data) {
    console.log(data);
  });
});

t.on('tweet', function(tweet) {
  io.emit('tweet', tweet);
  //  console.log(tweet);
});

t.on('error', function() {
  console.log('Oh no');
});

// t.track('pizza');
