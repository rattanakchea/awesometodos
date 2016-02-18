'use strict';

angular.module('awesometodoApp')
    .constant('FIREBASE_URI', 'https://awesometodos.firebaseio.com/')

.controller('MainCtrl', function($scope, AuthSvc) {

	$scope.todos = ['Item 1', 'Item 2', 'Item 3'];
	
	$scope.user = {
		firstName: 'rattanak',
		lastName: 'chea',
		email: 'rattanak.chea@gmail.com'
	};

	$scope.register = function(user){
		$scope.loading = true;

		 AuthSvc.register(user).then(function(data){
		 	console.log(data);
		 	$scope.loading = false;
		 	$scope.message = data;

		 }, function(err){
		 	console.warn(err);
		 	$scope.loading = false;

		 	$scope.message = err.code;
		 })	 
	};

	$scope.login = function(user){
		 AuthSvc.login(user).then(function(res){
		 	console.log(res);
		 	$scope.message = res;
		 }, function(err){
		 	$scope.message = err;
		 	console.log(err);
		 });
	}


});
