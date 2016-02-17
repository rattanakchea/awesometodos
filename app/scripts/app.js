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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
