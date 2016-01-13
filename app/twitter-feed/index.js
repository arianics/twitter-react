(function() {
  'use strict';
  angular.module('myApp.twitterFeed', [])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'twitter-feed/index.html',
        controller: 'TwitterFeedController'
      });
  }])
    .controller('TwitterFeedController', [function() {
      var socket = io.connect();
      socket.on('tweet', function(tweet) {
        if (tweet.lang === 'en') {
          console.log(tweet);
        }
      });
    }]);
}());
