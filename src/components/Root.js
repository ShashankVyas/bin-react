import React from "react";
import Header from "./Header";
import { connect } from 'react-redux';

class Root extends React.Component {

	render(){
		return(
				<div className={this.props.isBusy ? "topnav-closed" : "topnav-open"} id="myTopnav">
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
	function mapStateToProps(state) {
	  return {
	    isBusy: state.isBusyStatus
	  };
	}
	
export default connect(mapStateToProps)(Root);
