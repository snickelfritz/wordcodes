var React = require('react');
var createReactClass = require('create-react-class');
import firebase from './firebase.js'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth.js';

var Login = createReactClass({
  render: function() {
    // FirebaseUI config.
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      // TODO: add tosUrl
      tosUrl: '/',
    };

    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
    );
  }
});

export { Login };
