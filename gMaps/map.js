var cities = [{
    place: 'India',
    desc: 'A country of culture and tradition!',
    lat: 23.200000,
    long: 79.225487
}, {
    place: 'New Delhi',
    desc: 'Capital of India...',
    lat: 28.500000,
    long: 77.250000
}, {
    place: 'Kolkata',
    desc: 'City of Joy...',
    lat: 22.500000,
    long: 88.400000
}, {
    place: 'Mumbai',
    desc: 'Commercial city!',
    lat: 19.000000,
    long: 72.90000
}, {
    place: 'Bangalore',
    desc: 'Silicon Valley of India...',
    lat: 12.9667,
    long: 77.5667
}];

var name, start, end;

//Angular App Module and Controller
var mapApp = angular.module('mapApp', ['ngRoute']);
mapApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl: 'index.html',
        })
        .when('/trip', {
            templateUrl: 'trip.html',
            controller: 'LoginController'
        })
});
mapApp.controller('MainController', function($scope) {
    var ul = document.getElementById('nav-ul');

    var creatList = function(info) {
        var me = document.createElement('li');
        me.innerHTML = info.place + "";
        ul.appendChild(me);
    }
    for (i = 0; i < cities.length; i++) {
        creatList(cities[i]);
    }

    $scope.tripName = "ex";
    $scope.tripStart = "here";
    $scope.tripDestination = "there";
    $scope.tripColor = "red";
    $scope.writeUserData = function(tripName, tripStart, tripDestination, tripColor) {
        writeUserData(tripName, tripStart, tripDestination, tripColor);
    }



});
mapApp.controller('MapController', function($scope) {

    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(25, 80),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function(info) {

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.place
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '<br />' + info.lat + ' E,' + info.long + ' N, </div>';

        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent('<h2>' + marker.title + '</h2>' +
                marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    }

    for (i = 0; i < cities.length; i++) {
        createMarker(cities[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});
mapApp.controller('LoginController', function($scope) {

    $scope.txtEmail = document.getElementById('txtEmail');
    $scope.txtPassword = document.getElementById('txtPassword');
    $scope.btnLogin = document.getElementById('btnLogin');
    $scope.btnSignUp = document.getElementById('btnSignUp');
    $scope.btnLogout = document.getElementById('btnLogout');


    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    btnSignUp.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            btnLogout.classList.remove('hide');
            btnLogin.classList.add('hide');
        } else {
            console.log('not logged in');
            btnLogout.classList.add('hide');
            btnLogin.classList.remove('hide');
        }
    })

});