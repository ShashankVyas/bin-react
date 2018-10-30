import React from "react";

class Feature extends React.Component {
	
	render(){
		return(
			<div className="feature-list">
				<ul>
					<li><i className="fa fa-lightbulb-o fa-9x fa-fw"></i>   Lights</li>
					<li><i className="fa fa-signal  fa-9x fa-fw" aria-hidden="true"></i>   WiFi/LAN Connectivity</li>
					<li><i className="fa fa-plug  fa-9x fa-fw" aria-hidden="true"></i>   Power plug points</li>
					<li><i className="fa fa-video-camera fa-9x fa-fw" aria-hidden="true"></i>   Projector</li>
					<li><i className="fa fa-camera-retro fa-9x" aria-hidden="true"></i>   Video Conferencing</li>
					<li><i className="fa fa-phone fa-9x" aria-hidden="true"></i>   Telephony</li>
					<li><i className="fa fa-users fa-9x" aria-hidden="true"></i>   Capacity: 20</li>	
				</ul>
			</div>
		);
	}
}

export default Feature;
