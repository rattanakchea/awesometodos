(function() {
    'use strict';

    angular.module('awesometodoApp')
        .factory('TodoSvc', function(FIREBASE_URI, $firebaseArray, AuthSvc) {

            var rootRef = new Firebase(FIREBASE_URI);

            var TodoSvc = {};


            TodoSvc.addTodo = function(todo, uid) {
                $firebaseArray(rootRef.child('doing').child(uid)).$add({
                    title: todo
                });
            };

            TodoSvc.getAllDoings = function(uid) {
                return $firebaseArray(rootRef.child('doing').child(uid));
            };

            TodoSvc.getAllDones = function(uid) {
                return $firebaseArray(rootRef.child('done').child(uid));
            };

            TodoSvc.removeTodo = function(todoId, uid) {
                rootRef.child('doing').child(uid).child(todoId).remove();
            };

            TodoSvc.removeDone = function(todoId, uid) {
                rootRef.child('done').child(uid).child(todoId).remove();
            };


            TodoSvc.addDone = function(todo, uid) {
                $firebaseArray(rootRef.child('done').child(uid)).$add(todo);
            };

            TodoSvc.moveToDone = function(todo, uid) {
                TodoSvc.addDone(todo, uid);
                TodoSvc.removeTodo(todo.$id, uid);
            };

            TodoSvc.moveToDoing = function(task, uid) {
                $firebaseArray(rootRef.child('doing').child(uid)).$add(task);
                
                TodoSvc.removeDone(task.$id, uid);
            };



            return TodoSvc;
        });

}());
