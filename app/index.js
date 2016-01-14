(function() {
  'use strict';

  angular.module('myApp', [
    'ngRoute',
    'rx',
    'myApp.twitterFeed'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
}());
