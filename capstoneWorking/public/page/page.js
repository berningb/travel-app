angular.module('app').component('page', {
    templateUrl: 'page/page.html',
    controller: function($scope, $routeParams, $firebaseObject, fbRef, $location) {

        $scope.thing = $firebaseObject(fbRef.getTripRef($routeParams.name));
        console.log($scope.thing);
        var MPG,
            myLatLng, name, map;
        // map object
        map = {
            control: {},
            center: {
                latitude: -37.812150,
                longitude: 144.971008
            },
            zoom: 14,
            markers: []
        };

        $scope.map = map;
        $scope.markers = [];



        $scope.marker = {
            center: {
                latitude: -37.812150,
                longitude: 144.971008
            }
        }

        $scope.editTrip = function() {
            $location.path('tripEdit/' + $scope.thing.$id);
        }

        // instantiate google map objects for directions
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();

        // directions object -- with defaults
        $scope.thing.$loaded().then(function() {
            var isNew = true;
            if ($scope.thing.New == true) {
                $location.path('tripEdit/' + $scope.thing.$id);
            } else {

                $scope.directions = {
                    origin: $scope.thing.Location,
                    destination: $scope.thing.Destination,
                    showList: false,
                }
                MPG = $scope.thing.Mpg;
                name = $scope.thing.Name;
                $scope.getDirections();
            }

            // geocoder = new google.maps.Geocoder();
            // geocoder.geocode({ 'address': $scope.thing.Location, }, function(results, status) {
            //     if (status == google.maps.GeocoderStatus.OK) {

            //         $scope.map.center.latitude = results[0].geometry.location.lat();
            //         $scope.map.center.longitude = results[0].geometry.location.lng();

            //     } else {
            //         alert("Geocode was not successful for the following reason: " + status);
            //     }
            // });


        });


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




        //geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                $scope.map.center.longitude = position.coords.longitude;
                $scope.map.center.latitude = position.coords.latitude;
                myLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };
                $scope.marker.center.longitude = position.coords.longitude;
                $scope.marker.center.latitude = position.coords.latitude;
                checkGasStations(myLatLng);
            })

        }

        $scope.icon = {
            url: 'https://maps.gstatic.com/mapfiles/place_api/icons/gas_station-71.png',
            scaledSize: new google.maps.Size(50, 50)
        }

        function checkGasStations(myLatLng) {
            var me = { lat: myLatLng.lat, lng: myLatLng.lng };

            map2 = new google.maps.Map(document.getElementById('map2'), {
                center: me,
                zoom: 15
            });

            var request = {
                location: me,
                radius: '1000',
                type: ['gas_station']
            };

            service = new google.maps.places.PlacesService(map2);
            service.nearbySearch(request, callback);
        }


        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    createMarker(results[i]);
                }
            }
        }

        function createMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = {
                center: {
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng()
                }

            }

            $scope.markers.push(marker);
            $scope.$apply();

        }



        $scope.updateTrip = function() {
            var origin = (document.getElementById('origin').value);
            var destination = (document.getElementById('destination').value);
            console.log("Origin " + origin + " Destination " + destination)
            fbRef.updateRef($routeParams.name, {
                'Name': name,
                'Location': origin,
                'Destination': destination,
                'Mpg': MPG
            })
            $('#myAlert').show()
            window.setTimeout(function() { $("#myAlert").hide(); }, 2000);
        }




        // get directions using google maps api
        $scope.getDirections = function() {
            var request = {
                origin: document.getElementById('origin').value,
                destination: document.getElementById('destination').value,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            console.log(request.origin)
            console.log(request.destination)
            directionsService.route(request, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    var meters = response.routes[0].legs[0].distance.value;
                    var miles = Math.round(meters * 0.000621371);
                    document.getElementById('trip-cost').innerHTML = 'Total Cost: $' + Math.round(miles / MPG * 2.4);
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setMap($scope.map.control.getGMap());
                    directionsDisplay.setPanel(document.getElementById('directionsList'));
                    $scope.directions.showList = true;
                }
            });
        }

    }
})