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
      console.log(user);
      // console.log(!!user);
      this.setState({logged_in: !!user});
      // if (user) {
      //   componentThis.setState({logged_in: true});
      // } else {
      //   componentThis.setState({logged_in: false});
      // };
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
        <Header>Word Codes</Header>
        {Body}
      </div>
    )
  }
});

ReactDOM.render(<App/>,  document.getElementById("app"));
