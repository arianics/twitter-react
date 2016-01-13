//Lets require/import the HTTP module
var http = require('http');
var Twitter = require('node-tweet-stream');
var twitterConfig = require('./twitter-config.json')

//Lets define a port we want to listen to
var port=8080;

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}

//Create a server
var server = http.createServer(handleRequest);

var io = require('socket.io')(server);

//Lets start our server
server.listen(port, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", port);
});
var t = new Twitter(twitterConfig);

t.on('tweet', function (tweet) {
  io.emit('tweet', tweet);
});

t.on('error', function (err) {
  console.log('Oh no');
});

t.track('pizza');
