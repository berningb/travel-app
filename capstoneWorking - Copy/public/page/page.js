angular.module('app').component('page', {
    templateUrl: 'page/page.html',
    controller: function($scope, $routeParams, $firebaseObject, fbRef) {
        $scope.thing = $firebaseObject(fbRef.getTripRef($routeParams.name));

        function initMap() {
            var uluru = {
                lat: -25.363,
                lng: 131.044
            };
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: uluru
            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
        }
    }
})