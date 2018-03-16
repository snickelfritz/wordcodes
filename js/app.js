var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var Cookies = require('universal-cookie');
import { Header } from './header.js'
import { Login } from './login.js'
import { Dashboard } from './dashboard.js'
import firebase from './firebase.js'

const cookies = new Cookies();

var App = createReactClass({
  getInitialState: function() {
    return {
      logged_in: false,
    };
  },

  componentWillMount: function() {
    var componentThis = this;
    firebase.auth().onAuthStateChanged( (user) => {
      this.setState({logged_in: !!user});
      if (user) {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        // firebase.auth().currentUser.getIdToken(false)
          .then(function(idToken) {
            cookies.set('JWT', idToken);
          }).catch(function(error) {
            // TODO: Handle error
            console.log("Invalid token! Please login again.");
          })
      }
    } );
  },
  
  render: function() {

    const Body = !this.state.logged_in ? (
          <Login/>
        ) : (
          <Dashboard/>
        )

    return (
      <div>
        <Header title="Word Codes"/>
        {Body}
      </div>
    )
  }
});

ReactDOM.render(<App/>,  document.getElementById("app"));
