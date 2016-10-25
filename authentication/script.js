(function() {
    var config = {
        apiKey: "AIzaSyA65DCJTwkPM1gdjI2ClBHcsnsFdKYbMu0",
        authDomain: "web-app-a0d3e.firebaseapp.com",
        databaseURL: "https://web-app-a0d3e.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "933474657105"
    };
    firebase.initializeApp(config);

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');


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
}());