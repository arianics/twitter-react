(function () {
  'use strict';
  angular.module('myApp.twitterFeed', [])

  .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'twitter-feed/index.html',
        controller: 'TwitterFeedController'
      });
  }])
    .controller('TwitterFeedController', ['rx', function (rx) {

      var socket = io.connect();
      var tweetObservable = rx.Observable.fromEventPattern(function add(h) {
        socket.on('tweet', h);
      });

      var subscription = tweetObservable.subscribe(
        function (tweet) {
          if(tweet.lang === 'en') {
            console.log(tweet);
          }
        });
    }]);
}());
