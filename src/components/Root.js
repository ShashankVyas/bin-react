import React from "react";

import Header from "./Header";

class Root extends React.Component {

	render(){
		return(
				<div className="topnav" id="myTopnav">
				<div>
				<div>
				<Header />
				</div>
				</div>
				<div>
				<div>
				{this.props.children}
				</div>
				</div>
				</div>
		      );

	}
}

export default Root;
