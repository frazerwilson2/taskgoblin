import firebase from './database';
import '../style.scss';

var userId;

function submitTestField(){
	var val = document.getElementById('testInputField').value;
	console.log(val);
	var adaRef = firebase.database().ref(userId);
	adaRef.set({
	  'tasks': val
	});
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user);
    userId = user.uid;
    document.getElementById('loggedIn').style.display = 'block';
    document.querySelector('#loggedIn h1').innerHTML = 'Hey, ' + user.displayName;
    document.getElementById('testVal').addEventListener('click', submitTestField);
    var adaRef = firebase.database().ref(userId);
    adaRef.on("value", function(snapshot) {
    document.getElementById('setVal').innerHTML = snapshot.val().tasks;
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  } else {
    // No user is signed in.
    // signIn();
    document.getElementById('notLoggedIn').style.display = 'block';
    document.getElementById('signInBtn').addEventListener('click', signIn);
  }
});

function signIn(){
  // Start a sign in process for an unauthenticated user.
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithRedirect(provider);
}