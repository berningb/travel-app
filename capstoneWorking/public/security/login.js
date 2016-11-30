angular.module('app').component('login', {
    templateUrl: 'security/login.html',
    bindings: {
        currentAuth: '='
    },
    controller: function(auth, $location) {

        this.loggedIn = !!this.currentAuth;

        this.anonLogin = function() {
            auth.$signInAnonymously().then(function() {
                $location.path('/home');
            }).catch((function(err) {
                this.errorMessage = err.message;
            }).bind(this))
        }

        this.fbLogin = function() {
            auth.$signInWithPopup("facebook").then(function() {
                $location.path('/home');
            }).catch((function(err) {
                this.errorMessage = err.message;
                console.log(err);
            }).bind(this))
        }

        this.googleLogin = function() {
            auth.$signInWithPopup("google").then(function() {
                $location.path('/home');
            }).catch((function(err) {
                this.errorMessage = err.message;
            }).bind(this))
        }
    }
})