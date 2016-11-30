angular.module('app').component('edit', {
    templateUrl: 'edit/edit.html',
    controller: function($scope, $routeParams, $firebaseObject, fbRef, $location) {
        $scope.thing = $firebaseObject(fbRef.getTripRef($routeParams.name));

        $scope.updateName = function(name, location, destination, mpg) {
            fbRef.updateRef($routeParams.name, {
                'Name': name,
                'Location': document.getElementById('origin').value,
                'Destination': document.getElementById('destination').value,
                'Mpg': mpg,
                'New': false
            })
            $location.path('/trips');
        }


        //get destination autocomplete
        var address3 = (document.getElementById('origin'));
        var autocomplete = new google.maps.places.Autocomplete(address3);
        autocomplete.setTypes(['geocode']);
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            var address3 = '';
        });

        //get destination autocomplete
        var address2 = (document.getElementById('destination'));
        var autocomplete = new google.maps.places.Autocomplete(address2);
        autocomplete.setTypes(['geocode']);
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            var address2 = '';
        });


    }
})