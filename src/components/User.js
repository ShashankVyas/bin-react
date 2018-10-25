import React from "react";
import { CLIENT_ID } from "../config.js";
import {GoogleLogin,GoogleLogout} from 'react-google-login';

class User extends React.Component {
	
	  constructor(props) {
    	super(props);
	    this.state = {
	      loggedIn: [],
	      currentUser: null
	    };
	    this.setUserState = this.setUserState.bind(this);
	  }

	  componentDidMount() {
			this.setUserState();
		}

    onLoginSuccess(googleUser) {
      var profile = googleUser.getBasicProfile();
      document.getElementById('status').innerHTML = 'Thanks for logging in ' + profile.getName() + '!';

			sessionStorage.setItem('googleUser',JSON.stringify(googleUser));
			this.setUserState();
    }

    onLoginFailure(error) {
	    sessionStorage.clear('googleUser')
	    this.setUserState();
    }

   onLogout(googleUser) {
	    sessionStorage.clear('googleUser')
	    this.setUserState();
	    document.getElementById('status').innerHTML = "Logged Out";
    }

	  setUserState() {
	  	var userJson = JSON.parse(sessionStorage.getItem('googleUser'));

	  	if(userJson !== null){
		  	this.setState((state, props) => ({
		      loggedIn: userJson,
		      currentUser: userJson.profileObj.givenName
		    }));
	  	}else{
		  	this.setState((state, props) => ({
		      loggedIn: null,
		      currentUser: null
		    }));
	  	}
	  }

		render() {

			 let googleSignIn = (
				  <GoogleLogin
				    clientId={CLIENT_ID}
						theme = "dark"
						buttonText = "Login"
				    onSuccess={this.onLoginSuccess.bind(this)}
				    onFailure={this.onLoginFailure.bind(this)} />
		    );

			 let googleSignOut = (
			    <GoogleLogout
			      buttonText="Logout"
			      onLogoutSuccess={this.onLogout.bind(this)}
			    />
		    );

				return (
			  	<div className="Loginwrapper" >
							{this.state.currentUser === null ? googleSignIn : googleSignOut}
							<div id="status"> </div>
			    </div>
				);
		}
}

export default User;
