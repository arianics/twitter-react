(function () {
  'use strict';
  angular.module('myApp.twitterFeed', [])

  .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'twitter-feed/index.html',
        controller: 'TwitterFeedController',
        css: 'twitter-feed/index.css'
      });
  }])
    .controller('TwitterFeedController', ['$scope', 'rx',
      function ($scope, rx) {
        $scope.enTweets = [];
        $scope.itTweets = [];

        var socket = io.connect();
        var tweetObservable = rx.Observable.fromEventPattern(function add(h) {
          socket.on('tweet', h);
        });

        var enSubscription = tweetObservable
          .filter(x => x.lang === 'en')
          .filter(x => $scope.enTweets.indexOf(x.text) === -1)
          .map(function (response) {
              return response.text;
          })
          .subscribe(function (tweet) {
            $scope.$apply(function() {
              $scope.enTweets.unshift(tweet);
            });
          });

        var itSubscription = tweetObservable
          .filter(x => x.lang === 'it')
          .filter(x => $scope.itTweets.indexOf(x.text) === -1)
          .map(function (response) {
              return response.text;
          })
          .subscribe(function (tweet) {
            $scope.$apply(function() {
              $scope.itTweets.unshift(tweet);
            });
          });
      }]);
}());
