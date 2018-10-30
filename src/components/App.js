import React from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Status from "./Status";
import Feature from "./Feature";
import Book from "./Book";
import Ticket from "./Ticket";
import User from "./User";
import Home from "./Home"
import Header from "./Header"

class App extends React.Component {

	render() {

		return(
				<Router>
					<div  className={this.props.isBusy ? "appContainer busy" : "appContainer open"}>
						<Header />
							<Status />
							<div className="appletContainer">
								<Switch>
										<Route path={"/feature"} component={Feature} />
										<Route path={"/ticket"} component={Ticket} />
										<Route path={"/user"} component={User} />
										<Route path={"/book"} component={Book} />
										<Route path={"/"} component={Home} />
								</Switch>
							</div>
					</div>
				</Router>
		    );

	}
}

	function mapStateToProps(state) {
	  return {
	    isBusy: state.busyReducer.isBusyStatus
	  };
	}
	
export default connect(mapStateToProps)(App);
