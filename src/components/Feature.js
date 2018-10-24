import React from "react";

class Feature extends React.Component {
	render(){
		return(
			<div className="feature-list">
				<i className="fa fa-lightbulb-o" aria-hidden="true"></i>
				<i className="fa fa-signal" aria-hidden="true"></i>
				<i className="fa fa-plug" aria-hidden="true"></i>
				<i className="fa fa-video-camera" aria-hidden="true"></i>
				<i className="fa fa-phone" aria-hidden="true"></i>	
			</div>
		);
	}
}

export default Feature;