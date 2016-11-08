(function() {

    var config = {
        apiKey: "AIzaSyA65DCJTwkPM1gdjI2ClBHcsnsFdKYbMu0",
        authDomain: "web-app-a0d3e.firebaseapp.com",
        databaseURL: "https://web-app-a0d3e.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "933474657105"
    };

    var ref = firebase.initializeApp(config);
    var app = angular.module('app', ['firebase', 'ngRoute', 'google-maps']);
    app.config(function($firebaseRefProvider, $routeProvider) {
        $firebaseRefProvider.registerUrl({
            default: config.databaseURL,
            object: `https://web-app-a0d3e.firebaseio.com/object/users`
        });
        $routeProvider
            .when('/', {
                templateUrl: 'main/main.html',
            })
            .when('/login', {
                templateUrl: 'login/login.html',
            })
            .when('/display', {
                templateUrl: 'display/display.html'
            })
            .when('/create', {
                templateUrl: 'create.html'
            })
            .when('/trip', {
                templateUrl: 'trip.html',
            })
    })
    app.factory('ObjectFactory', ObjectFactory)
    app.controller('LoginCtrl', LoginCtrl);
    app.controller('DisplayCtrl', DisplayCtrl);
    app.controller('TripListCtrl', TripListCtrl);
    app.controller('MapController', MapController);

    function ObjectFactory($firebaseObject, $firebaseRef) {
        return $firebaseObject($firebaseRef.object);
    }

    function LoginCtrl($scope) {
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
            const promise = auth.createUserWithEmailAndPassword(email, pass)
                .then(user => createUser(user))
            promise.catch(e => console.log(e.message));
        });

        function createUser(user) {

            if (user != null) {
                const dbRefObject = firebase.database().ref().child('object');
                const dbRefList = dbRefObject.child("users/" + user.uid);
                dbRefList.set({
                    email: user.email,
                    uid: user.uid
                });
            }
        }

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
    }

    function DisplayCtrl(ObjectFactory) {
        console.log(ObjectFactory);
        const preObject = document.getElementById('object');
        const ulList = document.getElementById('list');

        const dbRefObject = firebase.database().ref().child('object');
        const dbRefList = dbRefObject.child('users/');

        dbRefList.on('child_added', snap => {
            const li = document.createElement('li');
            li.innerText = snap.val();
            li.id = snap.key;
            ulList.appendChild(li);
        });

        dbRefList.on('child_changed', snap => {
            const liChanged = document.getElementById(snap.key);
            liChanged.innerText = snap.val();
        });

        dbRefList.on('child_removed', snap => {
            const liToRemove = document.getElementById(snap.key);
            liToRemove.remove();
        });
    }

    function TripListCtrl($scope) {}

    function MapController($scope) {
        // map object
        $scope.map = {
            control: {},
            center: {
                latitude: -37.812150,
                longitude: 144.971008
            },
            zoom: 14
        };

        // marker object
        $scope.marker = {
            center: {
                latitude: -37.812150,
                longitude: 144.971008
            }
        }

        // instantiate google map objects for directions
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        var geocoder = new google.maps.Geocoder();

        // directions object -- with defaults
        $scope.directions = {
            origin: "camden tn",
            destination: "chicago",
            showList: false
        }

        // get directions using google maps api
        $scope.getDirections = function() {
            var request = {
                origin: $scope.directions.origin,
                destination: $scope.directions.destination,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            directionsService.route(request, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setMap($scope.map.control.getGMap());
                    directionsDisplay.setPanel(document.getElementById('directionsList'));
                    $scope.directions.showList = true;
                } else {
                    alert('Google route unsuccesfull!');
                }
            });
        }
    }

}());