var app = angular.module('app', ['ngRoute', 'firebase', 'google-maps']);


app.run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(e, next, prev, err) {
        if (err === "AUTH_REQUIRED") {
            $location.path("/login");
        }
    })
})

app.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            template: '<home></home>',
            resolve: {
                currentAuth: function(auth) {
                    return auth.$requireSignIn();
                }
            }
        })
        .when('/userpref', {
            template: '<editUserPref user-preferences=$resolve.userPreferences></editUserPref>',
            resolve: {
                userPreferences: function(fbRef, $firebaseObject, auth) {
                    return auth.$requireSignIn().then(function() {
                        return $firebaseObject(fbRef.getPreferencesRef()).$loaded();
                    })
                }
            }
        })
        .when('/trips', {
            template: '<tripList trips=$resolve.trips></tripList>',
            resolve: {
                trips: function(fbRef, $firebaseArray, auth) {
                    return auth.$requireSignIn().then(function() {
                        var query = fbRef.getTripsRef().orderByChild("name")
                        return $firebaseArray(query).$loaded();
                    })
                }
            }
        })
        .when('/trip/:name', {
            template: '<page></page>',
            resolve: {
                currentAuth: function(auth) {
                    return auth.$requireSignIn();
                }
            }
        })
        .when('/tripEdit/:name', {
            template: '<edit></edit>',
            resolve: {
                currentAuth: function(auth) {
                    return auth.$requireSignIn();
                }
            }
        })
        .when('/login', {
            template: '<login current-auth="$resolve.currentAuth"></login>',
            resolve: {
                currentAuth: function(auth) {
                    return auth.$waitForSignIn();
                }
            }
        })
        .when('/logout', {
            template: '<logout></logout>',
        })
})