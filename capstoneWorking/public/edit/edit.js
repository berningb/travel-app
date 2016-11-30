angular.module('app').component('edit', {
            templateUrl: 'edit/edit.html',
            controller: function($scope, $routeParams, $firebaseObject, fbRef, $location) {
                $scope.thing = $firebaseObject(fbRef.getTripRef($routeParams.name));

                $scope.updateName = function(name, location, destination, mpg) {
                    fbRef.updateRef($routeParams.name, {
                        'Name': name,
                        'Location': location,
                        'Destination': destination,
                        'Mpg': mpg,
                        'New': false
                    })
                    $location.path('/trips');
                    }

                }
            })