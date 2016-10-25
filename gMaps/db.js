function writeUserData(name, start, end, color) {
    firebase.database().ref('trip/' + name).set({
        name: name,
        start: start,
        destination: end,
        color: color
    });
}

function getTrips() {
    firebase.database().ref.child('trip').child('ex').once('value', function(snapshot) {
        renderBlog(snapshot.val());
    }, function(error) {
        console.error(error);
    });
}

function createUser(email, password) {

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

function checkLogin() {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

function signOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }, function(error) {
        // An error happened.
    });
}

function tryThis() {
    const auth = firebase.auth();

    auth.createUserWithEmailAndPassword("berningbrandon9@gmail.com", "hello");
}