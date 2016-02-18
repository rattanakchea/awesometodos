'use strict';

/**
 * @ngdoc overview
 * @name awesometodoApp
 * @description
 * # awesometodoApp
 *
 * Main module of the application.
 */
angular
  .module('awesometodoApp', [
    'ngAnimate',
    'ngRoute',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        redirectTo: '/register'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });

angular.module('awesometodoApp')
.run(function(){

});