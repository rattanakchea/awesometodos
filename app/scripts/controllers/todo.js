'use strict';

angular.module('awesometodoApp')
.controller('TodoCtrl', function($scope, AuthSvc, TodoSvc, currentUser) {

	$scope.todos = ['Item 1', 'Item 2', 'Item 3'];
	
	var uid = currentUser.$id;
	console.log(currentUser);

	$scope.addTodo = function(todo){
		if (todo){
			TodoSvc.addTodo(todo, uid);
			$scope.todo = '';
		}
	};

	$scope.removeTodo = function(todoId){
		TodoSvc.removeTodo(todoId, uid);
	};

	$scope.removeDone = function(todoId){
		TodoSvc.removeDone(todoId, uid);
	};

	$scope.moveToDone = function(todo){
		TodoSvc.moveToDone(todo, uid);
	};

	$scope.moveToDoing = function(done){
		TodoSvc.moveToDoing(done, uid);
	};

	$scope.allDoings = TodoSvc.getAllDoings(uid);
	$scope.allDones = TodoSvc.getAllDones(uid);



});
