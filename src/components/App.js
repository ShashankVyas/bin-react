import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from "./Home";
import Feature from "./Feature";
import Root from "./Root";
import Ticket from "./Ticket";
import User from "./User";


class App extends React.Component {

	render() {

		return(
				<Router className="appContainer">
					<div>
					 	<Route path={"/"} component={Root} />
						<Route path={"/"} component={Home} />
						<Route path={"/feature"} component={Feature} />
						<Route path={"/ticket"} component={Ticket} />
						<Route path={"/user"} component={User} />
					</div>
				</Router>
		    );

	}
}

export default App;
