import React from "react";
import { GOOGLE_API_KEY, CLIENT_ID, SCOPES } from "../config.js";


var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

class User extends React.Component {

	  constructor(props) {
    	super(props);
	    this.state = {
	      loggedIn: [],
	      currentUser: null,
				showAuthButton: true,
	      showSignOutButton: false
	    };

			this.initClient = this.initClient.bind(this);
			this.signinChanged =  this.signinChanged.bind(this);
	  }

	  componentDidMount() {
			this.handleClientLoad();

				this.state.showAuthButton === true ? this.handleAuthClick.bind(this) : this.handleSignoutClick.bind(this);
			//this.setUserState();
		}

		signinChanged(val) {
	    if (val) {
	      this.setState({
	        showAuthButton: false,
	        showSignOutButton: true
	      })
	    } else {
	      this.setState({
	        showAuthButton: true,
	        showSignOutButton: false
	      })
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

				return (
			  	<div className="Loginwrapper" >
							<div id="status"> </div>
			    </div>
				);
		}
}

export default User;
