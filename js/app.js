var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import { Header } from './header.js'
import { Login } from './login.js'
import { Dashboard } from './dashboard.js'
import firebase from './firebase.js'

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
