(function() {
    'use strict';

    angular.module('awesometodoApp')
        .factory('AuthSvc', function(FIREBASE_URI, $firebaseAuth, $q, $firebaseObject, $rootScope) {

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
                        user.gravatar = authData.password.profileImageURL;

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
                }).catch(function(err) {
                    //console.log(err);
                    return ("Log in failed");
                });
            };


            AuthSvc.initProfile = function() {

            };

            AuthSvc.getProfile = function(uid) {
                return $firebaseObject(rootRef.child('users').child(uid));
            };

            AuthSvc.isLoggedIn = function() {
                return !!AuthSvc.authData;
            };


            AuthSvc.resolveCurrentUser = function() {
                return Auth.$requireAuth().then(function(auth) {
                    return AuthSvc.getProfile(auth.uid).$loaded();
                });
            };



            //listening for authData
            Auth.$onAuth(function(authData) {
                if (authData) {
                    AuthSvc.authData = authData;
                    $rootScope.currentUser = $firebaseObject(rootRef.child('users').child(AuthSvc.authData.uid));

                } else {
                    AuthSvc.authData = null;
                    $rootScope.currentUser = null;
                }
            });


            return AuthSvc;
        });

}());
