import React from "react";
import 'react-dropdown/style.css'
import Dropdown from 'react-dropdown'
import { connect } from 'react-redux';
import {options, defaultOption} from "./resources/caps.js"

class Ticket extends React.Component {
	  constructor(props) {
    super(props);
    this.state = {
      issue: null
    };
  }
	
	disableCap = () =>  {
		this.props.dispatch({ type: 'DEACTIVATE_CAP', value: this.state.issue });
		this.props.history.push('/feature')
	}
	
	onSelect = (selectedOption) =>{
		this.setState({
			issue: selectedOption.value
		});
	}

	render(){
		return(
			<div className="open-ticket">
				<h3 className="book-now">Got an issue? We will fix it!</h3>
				
				<div className="ticket-dropdown">
					<Dropdown options={options} onChange={this.onSelect} placeholder="Select an option" />		
				</div>
				
				<div className="addn-dtls-ticket">
					<textarea placeholder="Ex. Lights are broken" className="ticket-text-box" rows="4" cols="50" />
				</div>
				
				<button
					className="button"
					buttontext="Submit"
					onClick={()=>this.disableCap()}
				>
					Submit
				</button>
				
			</div>
		);
	}
}
	function mapStateToProps(state) {
		return {
	    caps: state.featureReducer.capabilities
	  };
	}
	
export default connect(mapStateToProps)(Ticket);