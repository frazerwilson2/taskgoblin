import firebase from './database';

var tgUsers = (function($){
var userId;

console.log('running');

var publicFunc = {
  Init: function(){
    console.log('init called');

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        userId = user.providerData[0].uid;
        // console.log(firebase.database().ref('tasks'));
        var ref = firebase.database().ref("tasks");

        // Attach an asynchronous callback to read the data at our posts reference
        ref.on("value", function(snapshot) {
          // console.log(typeof snapshot.val());
          let respData = Object.values(snapshot.val());
          let filterData = respData.filter(function(i){
            return !i.isTrusted;
          });
          // console.log(filterData);
          var event = new CustomEvent("name-of-event", { "detail": filterData });
          document.dispatchEvent(event);
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
        // console.log(user.providerData[0].uid);
        setUpSignIn(user);
      } else {
        // No user is signed in.
        showSignIn();
      }
    });
  },
  Post: function(task){
    console.log(task);
    submitTestField(task);
  }
};

  function submitTestField(task){
    // var val = document.getElementById('toDoItem').value;
    // convert to public func so user can post task and retrieve data
    // var adaRef = firebase.database().ref(userId);
    // adaRef.set({
    //   task: task
    // });
  
  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('tasks').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/tasks/' + newPostKey] = task;
  // updates['/user-posts/' + userId + '/' + newPostKey] = task;

  return firebase.database().ref().update(updates);
  }

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

return publicFunc;

})();

export default tgUsers;