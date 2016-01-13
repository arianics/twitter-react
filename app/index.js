(function() {
  'use strict';

  angular.module('myApp', [
    'ngRoute',
    'myApp.twitterFeed'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
}());
