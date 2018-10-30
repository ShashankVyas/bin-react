import React from "react";
import moment from "moment";
import Clock from 'react-clock'
import { connect } from 'react-redux';
import TimePicker from 'rc-time-picker';
import { Redirect } from 'react-router-dom';
import { CALENDAR_ID, TARGET_CALENDAR } from "../config.js";

const ROUNDING = 30 * 60 * 1000;
const format = 'h:mm a';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  		startTime: moment(),
  		endTime: moment(Math.ceil((+moment().add(15, 'minutes')) / ROUNDING) * ROUNDING)
    };
  }

  setStart = (val) => {
		this.setState({
			startTime:val
		});
	}

	setEnd = (val) => {
		this.setState({
			endTime:val
		});
	}
	
	updateEvents = (val) =>  {
		this.props.dispatch({ type: 'UPDATE_EVENTS' });
	}

	addEvent = () => {
   	let postData = {
			'summary': 'Quick Meeting',
			'description': 'Quick Meeting booked by SAM',
			'start': {
				'dateTime': moment(this.state.startTime).toISOString()
			},
			'end': {
				'dateTime': moment(this.state.endTime).toISOString()
			},
			'reminders': {
				'useDefault': false,
			},
	    'attendees': [
	        {
	          'email': CALENDAR_ID
	        }
	    ]
	};
		window.gapi.client.calendar.events.insert({
		  'calendarId': TARGET_CALENDAR,
		  'resource': postData
		}).then( (event) => {
			this.updateEvents(event);
		}).then(() => {
			this.props.history.push('/');
		}).catch( (error) => {
        console.log(error);
    });    
    
  }

  render(){

  let addState = (
      <div>
				
				<h3 className="book-now">Book now for {moment(this.state.endTime).diff(this.state.startTime, 'minutes') + 1} minutes</h3>
				
	      <div className="clock-container">
	        <Clock
	          value={moment(this.state.startTime).toDate()}
	        />
	      </div>

	      <div className="startTimeContainer">
		      <TimePicker
			      id="startTime"
			      showSecond={false}
			      value={this.state.startTime}
			      onChange={this.setStart}
			      format={format}
			      use12Hours
		      />
		      <TimePicker
			      id="endTime"
			      showSecond={false}
			      value={this.state.endTime}
			      onChange={this.setEnd}
			      format={format}
			      use12Hours
	        />
	      </div>
				
				<div className="actions">
			   		<button
			        className="button"
		          buttontext="Submit"
			        onClick={this.addEvent}>Submit</button>
		    </div>
		    
      </div>);
      
    let linkToLogin = (
    		<div className="book-container">
    			<h3 className="book-now"> Please Log into google before inserting an event!</h3>
    		</div> 
    );
    
   	return(
   		<div id="Status" className='book-container'>
   			{this.props.isLoggedIn ? addState : linkToLogin}
   		</div>
   	)

  }
}

	function mapStateToProps(state) {
	  return {
	    isLoggedIn: state.loginReducer.isLoggedIn
	  };
	}
	
export default connect(mapStateToProps)(Book);
