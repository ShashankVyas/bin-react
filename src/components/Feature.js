import React from "react";
import { connect } from 'react-redux';

class Feature extends React.Component {
	
	render(){
		
		const caps = this.props.caps;
		
		let capsList = caps.map((cap,index) => {
			return (
					<li
			    key={index}
			    >
			     	<span className={cap.class} />
			     		{cap.active ? <span>{cap.name}</span> : <del>{cap.name}</del>}
			    </li>);
		});
			  
		return(
			<div className="feature-list">
				<ul>
					{capsList}
				</ul>
			</div>
		);
	}
}

	function mapStateToProps(state) {
		return {
	    caps: state.featureReducer.capabilities
	  };
	}
	
export default connect(mapStateToProps)(Feature);