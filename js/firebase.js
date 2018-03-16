var firebase = require('firebase');

console.log("Before init: ", firebase);
const config = {
  apiKey: "AIzaSyAOHzp5vptrT9Y1H8NsZ9sKhYLvABKkDLw",
  authDomain: "wordcodes-731c6.firebaseapp.com",
  databaseURL: "https://wordcodes-731c6.firebaseio.com",
  projectId: "wordcodes-731c6",
};

firebase.initializeApp(config);
console.log("After init: ", firebase);

const auth = firebase.auth();
console.log(auth);

export { firebase, auth };
