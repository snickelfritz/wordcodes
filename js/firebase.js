var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyAOHzp5vptrT9Y1H8NsZ9sKhYLvABKkDLw",
  authDomain: "wordcodes-731c6.firebaseapp.com",
  databaseURL: "https://wordcodes-731c6.firebaseio.com",
  projectId: "wordcodes-731c6",
  storageBucket: "wordcodes-731c6.appspot.com",
  messagingSenderId: "265948614939",
};
firebase.initializeApp(config);

export default firebase;
