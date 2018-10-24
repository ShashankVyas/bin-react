import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'


import Root from "./Root";
import Home from "./Home";
import Feature from "./Feature";
import Ticket from "./Ticket";
import User from "./User";
import Book from "./Book";

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
				<Route path={"/book"} component={Book} />
				</div>
				</Router>
		      );

	}
}

export default App;
