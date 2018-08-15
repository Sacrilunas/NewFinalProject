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


// handleLogOut gets called when the button is pressed
 function handleLogOut() {
	 firebase.auth().signOut().catch(function(error) {
		 // An error happened
		document.getElementById('message-box').innerHTML = error.message;
	});
}

// waits for authentication status changes
function authStatusListener() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// A user is signed in
		} else {
			document.getElementById('message-box').innerHTML = "You're logged out.";
			document.getElementById('log-out-form').innerHTML = '';
      location.href = "NoLog.html"
		}
	});
}

// the function that gets called when the page first loads
function init() {
	authStatusListener();
}

// tells the browser to call init when the page first loads
window.onload = init();
