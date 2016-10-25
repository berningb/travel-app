(function() {
    var config = {
        apiKey: "AIzaSyA65DCJTwkPM1gdjI2ClBHcsnsFdKYbMu0",
        authDomain: "web-app-a0d3e.firebaseapp.com",
        databaseURL: "https://web-app-a0d3e.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "933474657105"
    };
    firebase.initializeApp(config);



    const preObject = document.getElementById('object');
    const ulList = document.getElementById('list');

    const dbRefObject = firebase.database().ref().child('object');
    const dbRefList = dbRefObject.child('hobbies');

    //state synchronization
    dbRefObject.on('value', snap => {
        preObject.innerText = JSON.stringify(snap.val(), null, 3)
    });

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


}());