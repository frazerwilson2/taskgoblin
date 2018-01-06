import firebase from './database';

var tgUsers = (function($){
var userId;

function submitTestField(){
	var val = document.getElementById('toDoItem').value;
	console.log(val);
  // convert to public func so user can post task and retrieve data
	var adaRef = firebase.database().ref(Date.now());
	adaRef.set({
	  // 'tasks': val
    12334543558769: {test1:"val", name: "test", type: 3}
	});
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // console.log(user);
    setUpSignIn(user);
  } else {
    // No user is signed in.
    showSignIn();
  }
});

function setUpSignIn(user){
    userId = user.uid;
    document.body.classList.add('logged-in');
    document.querySelector('#userName').innerHTML = 'You\'re ' + user.displayName;
    document.getElementById('submitDoTo').addEventListener('click', submitTestField);
    // var adaRef = firebase.database().ref(userId);
    // adaRef.on("value", function(snapshot) {
    // document.getElementById('setVal').innerHTML = snapshot.val().tasks;
    //   console.log(snapshot.val());
    // }, function (errorObject) {
    //   console.log("The read failed: " + errorObject.code);
    // });
};

function showSignIn(){
    document.body.classList.add('logged-out');
    // document.getElementById('notLoggedIn').style.display = 'block';
    document.getElementById('signInBtn').addEventListener('click', signIn);
};

function signIn(){
  // Start a sign in process for an unauthenticated user.
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithRedirect(provider);
};

})();