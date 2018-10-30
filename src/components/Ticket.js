import React from "react";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'


	const options = [
			{
			 type: 'group', name: 'Electronic Issues', items: [
			   { value: 'comp', label: 'Computer Issues' },
			   { value: 'proj', label: 'Projecter Issues' },
			   { value: 'tele', label: 'Telephone Issues' },
			   { value: 'wifi', label: 'Wifi Issues' },
			   { value: 'vide', label: 'Video Conference Issues' },	   
			   { value: 'othe', label: 'Other Issue' }
			 ]
			},
			{
			 type: 'group', name: 'Room Issues', items: [
			   { value: 'ligh', label: 'Light Issues' },
			   { value: 'outl', label: 'Outlet Issues' },
			   { value: 'equi', label: 'Equipment Issue' },
			   { value: 'othe', label: 'Other Issue' }
			 ]
			},
			{
			 type: 'group', name: 'Misc Issues', items: [
			   { value: 'othe', label: 'Other Issue' }
			 ]
			}
		]
		
		const defaultOption = options[0]

class Ticket extends React.Component {
	

	render(){
		return(
			<div className="open-ticket">.
				<h3 className="book-now">Got an issue? We will fix it!</h3>
				
				<div className="ticket-dropdown">
					<Dropdown options={options} /*onChange={this._onSelect} value={defaultOption}*/ placeholder="Select an option" />		
				</div>
				
				<div className="addn-dtls-ticket">
					<textarea className="ticket-text-box" rows="4" cols="50">Enter any additional notes here! :D</textarea>
				</div>
				
				<button
					className="button"
					buttontext="Submit"
					onClick={()=>this.props.history.push('/')}
				>
					Submit
				</button>
				
			</div>
		);
	}
}

export default Ticket;
