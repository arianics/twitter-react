'use strict';

angular.module('myApp.twitterFeed', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'twitter-feed/index.html',
      controller: 'TwitterFeedController'
    });
}])
.controller('TwitterFeedController', [function () {
    console.log('hello??');
}]);