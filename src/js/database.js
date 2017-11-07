var firebase = require("firebase");

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAaB-Jh7AwwKwiauabB0oTSY0WLIXMC5RQ",
	authDomain: "newagent-b1fcd.firebaseapp.com",
	databaseURL: "https://newagent-b1fcd.firebaseio.com",
	projectId: "newagent-b1fcd",
	storageBucket: "newagent-b1fcd.appspot.com",
	messagingSenderId: "740869263106"
};

firebase.initializeApp(config);

export default firebase;