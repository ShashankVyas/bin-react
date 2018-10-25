import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Popup from "reactjs-popup";

import Home from "./Home";


class App extends React.Component {

	render() {

		return(
				<Router className="appContainer">
					<div>
						{/* <Route path={"/"} component={Root} /> */}
						<Route path={"/"} component={Home} />
						{/*
						<Route path={"/feature"} component={Feature} />
						<Route path={"/ticket"} component={Ticket} />
						<Route path={"/user"} component={User} />
						<Route path={"/book"} component={Book} />*/}
					</div>
				</Router>
		    );

	}
}

export default App;
