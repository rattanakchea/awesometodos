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
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'MainCtrl'
            })
            .when('/todos', {
                templateUrl: 'views/todos.html',
                controller: 'TodoCtrl',
                resolve: {
                    currentUser: function(AuthSvc) {
                        //console.log(AuthSvc.resolveCurrentUser());
                        return AuthSvc.resolveCurrentUser();
                    }
                }
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html'
            })
            .otherwise({
                redirectTo: '/login'
            });
    });

angular.module('awesometodoApp')
    .run(function($rootScope) {

        $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user back to login page
            if (error === "AUTH_REQUIRED") {
                $location.path("/login");
            } else {
                $location.path("/");
            }
        }); //end on routeChangeError

    });
