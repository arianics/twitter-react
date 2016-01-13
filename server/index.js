//Lets require/import the HTTP module
var http = require('http');
var Twitter = require('node-tweet-stream');

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
