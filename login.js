// config contains the logins you need to use the Firebase API
var config = {
  apiKey: "AIzaSyBcf-ljP-cQWuhAHDo9mP_aWmNzGz7onyQ",
  authDomain: "webpage-log-in.firebaseapp.com",
  databaseURL: "https://webpage-log-in.firebaseio.com",
  projectId: "webpage-log-in",
  storageBucket: "webpage-log-in.appspot.com",
  messagingSenderId: "388817267792"
};

// Initialize Firebase
firebase.initializeApp(config);


// handleLogIn gets called when the button is pressed
function handleLogIn() {

  // get what the user typed
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // call API function
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    document.getElementById('message-box').innerHTML = errorMessage;

    console.log(error);
 });
}

// waits for authentication status changes
function authStatusListener() {
 firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
     document.getElementById('log-in-form').innerHTML='';
     document.getElementById('message-box').innerHTML = "You're signed in!";
     location.href = "livnyc.html";
   } else {
     // No user is signed in.
   }
 });
}

// the function that gets called when the page first loads
function init() {
 authStatusListener();
}

// tells the browser to call init when the page first loads
window.onload = init();
