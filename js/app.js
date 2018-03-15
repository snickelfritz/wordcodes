var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import { Header } from './header.js'
import { Login } from './login.js'
import { Dashboard } from './dashboard.js'
import firebase from './firebase.js'

var auth = firebase.auth();
console.log(auth);

var logged_in = false;
auth.onAuthStateChanged( (user) => {
  if (user) {
    logged_in = true;
  } else {
    logged_in = false;
  }
} );

var App = createReactClass({
  render: function() {

    const Body = !logged_in ? (
          <Login firebaseAuth={auth}/>
        ) : (
          <Dashboard/>
        )

    return (
      <div>
        <Header>Word Codes</Header>
        {Body}
      </div>
    )
  }
});

ReactDOM.render(<App/>,  document.getElementById("app"));
