import React from "react";
import { GOOGLE_API_KEY, CLIENT_ID, SCOPES } from "../config.js";


var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

class User extends React.Component {

	  constructor(props) {
    	super(props);
	    this.state = {
				showAuthButton: true
	    };

			this.initClient = this.initClient.bind(this);
			this.signinChanged =  this.signinChanged.bind(this);
	  }

	  componentDidMount() {
			this.handleClientLoad();
		}

		signinChanged(val) {
	    if (val) {
	    	localStorage.setItem('isLoggedIn', true);
	      this.setState({
	        showAuthButton: false
	      })
	    } else {
	      this.setState({
	        showAuthButton: true
	      })
	      localStorage.setItem('isLoggedIn', false);
	    }
		};

		initClient() {
	    window.gapi.client.init({
	      discoveryDocs: DISCOVERY_DOCS,
	      clientId: CLIENT_ID,
	      scope: SCOPES,
	      apiKey: GOOGLE_API_KEY
	    }).then(function () {
	      console.log(window.gapi);
	    }).catch( (error) => {
        console.log(error);
      });
	    window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.signinChanged);
	    this.signinChanged(window.gapi.auth2.getAuthInstance().isSignedIn.get());
	  }

		handleAuthClick(){
	    window.gapi.auth2.getAuthInstance().signIn();
	  }

	  handleSignoutClick(){
	    window.gapi.auth2.getAuthInstance().signOut();
	  }

	  handleClientLoad() {
	    window.gapi.load('client:auth2', this.initClient);
	  }

		render() {
		
				let signIn = (
					<a href='Javascript:void(0);'
						onClick = {this.handleAuthClick.bind(this)}>
						<img src={require("../images/btn_google_signin_dark_normal_web.png")} alt="Google signin"/>
					</a>
				);
				
				let signOut = (
					<a href='Javascript:void(0);'
						onClick = {this.handleSignoutClick.bind(this)}>
						Sign Out
					</a>		
				);
		
				return (
			  	<span>
			  			{this.state.showAuthButton ? signIn : signOut}
							<div id="status"> </div>
			    </span>
				);
		}
}

export default User;
