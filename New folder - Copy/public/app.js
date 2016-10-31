(function() {


    var config = {
        apiKey: "AIzaSyA65DCJTwkPM1gdjI2ClBHcsnsFdKYbMu0",
        authDomain: "web-app-a0d3e.firebaseapp.com",
        databaseURL: "https://web-app-a0d3e.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "933474657105"
    };

    var ref = firebase.initializeApp(config);
    var app = angular.module('app', ['firebase', 'ngRoute']);
    app.config(function($firebaseRefProvider, $routeProvider) {

        $firebaseRefProvider.registerUrl({
            default: config.databaseURL,
            object: `${config.databseUrl}/object/trips`
        });
        $routeProvider
            .when('/', {
                templateUrl: 'main.html',
            })
            .when('/login', {
                templateUrl: 'login.html',
            })
            .when('/trip', {
                templateUrl: 'trip.html',
            })

    })
    app.factory('ObjectFactory', ObjectFactory)
    app.controller('LoginCtrl', LoginCtrl);
    app.controller('TripListCtrl', TripListCtrl);

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

            const promise = auth.createUserWithEmailAndPassword(email, pass);
            promise.catch(e => console.log(e.message));

            firebase.database().ref().child("users").child(authData.uid).set({
                provider: authData.provider,
                name: getName(authData)
            });
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
    }

    function TripListCtrl($scope) {
        const preObject = document.getElementById('object');
        const ulList = document.getElementById('list');

        const dbRefObject = firebase.database().ref().child('object');
        const dbRefList = dbRefObject.child('trips/');

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

}());