(function() {
'use strict';

angular.module('awesometodoApp')
    .factory('AuthSvc', function(FIREBASE_URI, $firebaseAuth, $q) {

        var Auth = $firebaseAuth(new Firebase(FIREBASE_URI));
        var rootRef = new Firebase(FIREBASE_URI);

        var AuthSvc = {};
        

        AuthSvc.register = function(user) {
            return Auth.$createUser({
                    email: user.email,
                    password: user.password
                })
                .then(function(authData) {
                    //log in
                    return Auth.$authWithPassword(user);
                }).then(function(authData) {
                    //create a profile
                    AuthSvc.createProfile(authData.uid, user);

                    return "Register successfully";
                });
        }

        AuthSvc.createProfile = function(uid, user) {
            rootRef.child('users').child(uid).set(user, function(err) {
                if (err) {
                    $log.debug('err in createProfile: ', error);
                } else {
                    //init profile
                }
            });
        };

         AuthSvc.login = function(user) {
            console.log('logging in..', user);

            return Auth.$authWithPassword({
                email: user.email,
                password: user.password
            }).then(function(authData) {
                return ("Log in successfully");
            }).catch(function(err){
                //console.log(err);
                return ("Log in failed");
            });
        };


        return AuthSvc;
    });

}());
