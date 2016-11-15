angular.module('app').component('triplist', {
    templateUrl: 'trips/tripList.html',
    bindings: {
        trips: '='
    },
    controller: function($scope, fbRef) {
        console.log(this.trips);
        this.createNewTrip = function() {
            this.trips.$add({
                Name: this.newTripName
            });
            this.newTripName = '';
        }
        $scope.removeChild = function(id) {
            fbRef.removeRef(id);
        }
    }

})