angular.module('app').component('edit', {
    templateUrl: 'edit/edit.html',
    controller: function($scope, $routeParams, $firebaseObject, fbRef) {
        $scope.thing = $firebaseObject(fbRef.getTripRef($routeParams.name));

        $scope.updateName = function(name, location, destination, mpg) {
            fbRef.updateRef($routeParams.name, {
                'Name': name,
                'Location': location,
                'Destination': destination,
                'Mpg': mpg
            })
        }
        $scope.removeChild = function() {
            fbRef.removeRef($routeParams.name);
        }
    }
})