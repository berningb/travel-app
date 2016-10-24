function writeUserData(name, start, end) {
    firebase.database().ref('trip/' + name).set({
        name: name,
        start: start,
        destination: end
    });
}

function getTrips() {
    firebase.database().ref.child('trip').child('ex').once('value', function(snapshot) {
        renderBlog(snapshot.val());
    }, function(error) {
        console.error(error);
    });
}