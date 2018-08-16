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

// Get a reference to the database service
var database = firebase.database();



// Handles the submit button being clicked based on user id
function changePrefs(){
	var user = firebase.auth().currentUser;
	var colour = document.getElementById('colour-box').value;
	var movie = document.getElementById('movie-box').value;

	if (user) {
		var uid = user.uid;
		setPref(uid, colour, movie);
    showAll();
	}
}

function showAll(){
  var user = firebase.auth().currentUser;
  // builds the location of the data
  var ref = database.ref('/user_prefs/' + user.uid);

  // gets the data
  return ref.once('value').then(function(snapshot){
    var my_pref = snapshot.val();
    var my_html = '';
    for (var key in my_pref) {
      var movie_color_pair = my_pref[key];
      // alert(movie_color_pair.colour + " " + movie_color_pair.movie);
      my_html += "A colour: " + movie_color_pair.colour + "<br> A movie: " + movie_color_pair.movie;


      }
      alert(my_html);
      document.getElementById('print').innerHTML = my_html;
  });
}

function setPref(uid, colour, movie){
	var prefs = {
		colour: colour,
		movie: movie,
	};

	var ref = database.ref('/user_prefs/' + uid);


  // Get a key for a new Post.
  var newPostKey = ref.push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/' + newPostKey]  = prefs;

	ref.update(updates);
}

// Gets favourite colour and movie based on user id (uid)
function getPref(uid){
	// builds the location of the data
	var ref = database.ref('/user_prefs/' + uid);

	// gets the data
	return ref.once('value').then(function(snapshot){
		// when it's successful, get the value JSON
		var my_pref = snapshot.val();

		// get the values in the JSON
		var colour = my_pref.colour;
		var movie = my_pref.movie;

		// if there are no values for this entry in the database, change the variables
		if(!colour) {
			colour = 'Nothing in database!';
		}
		if(!movie) {
			movie = 'Nothing to database!';
		}

		// change the display
		document.getElementById('colour').innerHTML = my_pref.colour;
		document.getElementById('movie').innerHTML = my_pref.movie;
	});
}

function authStatusListener() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			getPref(user.uid);

		} else {
			// User not signed in, get rid of the form and display a message
			document.getElementById('pref-form').innerHTML = '';
			document.getElementById('message-box').innerHTML = 'You are not logged in!';
		}
	});
}

window.onload = function() { authStatusListener(); };
