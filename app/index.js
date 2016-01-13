'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.twitterFeed'
]).
config(['$routeProvider', function($routeProvider) {
  console.log('routeProvider main');
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
