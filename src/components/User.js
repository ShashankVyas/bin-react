import React from "react";
import { GOOGLE_API_KEY, CLIENT_ID, SCOPES } from "../config.js";
import { connect } from 'react-redux';

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
		
		loggedIn = () => {
			this.props.dispatch({ type: 'LOG_IN' });
		}

		loggedOut = () => {
			this.props.dispatch({ type: 'LOG_OUT' });
		}

		signinChanged(val) {
	    if (val) {
				this.loggedIn();
	    }
	    else {
				this.loggedOut();
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
	    this.loggedOut();
	  }

	  handleClientLoad() {
	    window.gapi.load('client:auth2', this.initClient);
	  }

		render() {
		
				let signIn = (
					<a href='Javascript:void(0);'
						onClick = {this.handleAuthClick.bind(this)}>
						Sign In
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
			  			{this.props.isLoggedIn ? signOut : signIn}
							<div id="status"> </div>
			    </span>
				);
		}
}

	function mapStateToProps(state) {
	  return {
	    isLoggedIn: state.loginReducer.isLoggedIn
	  };
	}
	
export default connect(mapStateToProps)(User);
