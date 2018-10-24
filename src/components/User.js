import React from "react";
import { CLIENT_ID } from "../config.js";
import {GoogleLogin,GoogleLogout} from 'react-google-login';

//don't think we need these here. Only on booking page. Keeping here in case we don't have it else where.


class User extends React.Component {
		//default state
	  constructor(props) {
    	super(props);
	    this.state = {
	      loggedIn: [],
	      currentUser: null
	    };
	    this.setUserState = this.setUserState.bind(this);
	  }

	  //Basically check to see if we are logged in already
	  componentDidMount() {
			this.setUserState();
		}

	  //When login is successful we receive a googleUser json back from the service. Has some basic info like name, email and jwt token. We store it the session for later use
	  // FYI, session is the same throughout the app and can survive refresh.
    onLoginSuccess(googleUser) {
      var profile = googleUser.getBasicProfile();
      document.getElementById('status').innerHTML = 'Thanks for logging in ' + profile.getName() + '!';

			//Store responce in session. JWT key included. Type sessionStorage.getItem('googleUser') in console to view. Add add jwt to authorization header when making requests.
			sessionStorage.setItem('googleUser',JSON.stringify(googleUser));
			this.setUserState();
    }

    //If for some reason we get an error on trying to login, we need to clean up.
    onLoginFailure(error) {
	    sessionStorage.clear('googleUser')
	    this.setUserState();
    }

	 //this method is called when the signout button is successful. Although logged out we need to clear the session and update the state
   onLogout(googleUser) {
	    sessionStorage.clear('googleUser')
	    this.setUserState();
	    document.getElementById('status').innerHTML = null;
    }

    //parse the plain string json to get the user name. Mainly POC if we want to include the name somewhere else. Also it is used to decide to show sign in or out above.
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

			//part of the react-google-login library
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
							<div id="status"  />
			    </div>
				);
		}
}

export default User;
