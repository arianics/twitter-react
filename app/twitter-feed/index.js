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
    .controller('TwitterFeedController', ['$scope', 'rx', '$http',
      function ($scope, rx, $http) {
        $scope.enTweets = [];
        $scope.itTweets = [];
        $scope.tagList = [];
        $scope.searchTag = null;
        
        $scope.addTag = function(){
             if($scope.searchTag){
                  $http.get('/addTag/'+$scope.searchTag);
                 $scope.tagList.push($scope.searchTag);
             }
             console.log($scope.tagList);
        };
        
        $scope.removeTag = function(index){
             if($scope.searchTag){
                  $http.get('/removeTag/'+$scope.tagList[index]);
                 $scope.tagList.splice(index-1, 1);
             }
             console.log($scope.tagList);
        };
        
        var socket = io.connect();
        var tweetObservable = rx.Observable.fromEventPattern(function add(h) {
          socket.on('tweet', h);
        });

        tweetObservable
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

        tweetObservable
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
