angular.module('app').component('edituserpref', {
    templateUrl: 'userPreferences/editUserPref.html',
    bindings: {
        userPrefData: '=userPreferences'
    },
    controller: function(fbRef, $scope, $location) {
        this.themes = [
            "light",
            "dark"
        ]

        this.userPrefData.$bindTo($scope, "$ctrl.userPreferences").then((function() {
            if (!this.userPreferences.theme) {
                this.userPreferences.theme = this.themes[0];
            }
        }).bind(this))
        this.save = function() {
            this.userPrefData.$save();
            $location.path('/home');

        }
        this.cancel = function() {
            $location.path('/home');
        }
    }
})