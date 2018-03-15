var React = require('react');
var createReactClass = require('create-react-class');
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth.js';

var Login = createReactClass({
  render: () => {
    console.log(this.props);
    // FirebaseUI config.
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      // TODO: add tosUrl
      tosUrl: '/',
    };

    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={this.props.auth}/>
    );
  }
});

export { Login };
