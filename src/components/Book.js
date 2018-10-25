import React from "react";
import axios from 'axios';
import moment from "moment";
import TimePicker from 'rc-time-picker';
import Clock from 'react-clock'
import { GOOGLE_API_KEY, CALENDAR_ID, TARGET_CALENDAR } from "../config.js";

const ROUNDING = 30 * 60 * 1000;
const format = 'h:mm a';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  		startTime: moment(),
  		endTime: moment(Math.ceil((+moment().add(15, 'minutes')) / ROUNDING) * ROUNDING),
  		loggedIn: false,
  		isConfirm: false
    };
    this.addEvent = this.addEvent.bind(this);
    this.setStart = this.setStart.bind(this)
    this.setEnd = this.setEnd.bind(this)
  }

  componentDidMount() {
		this.setUserState();
	}

  setUserState() {
	  let isLoggedIn = window.gapi.auth2.getAuthInstance().currentUser.get().isSignedIn();
	 
		this.setState({
			loggedIn: isLoggedIn
		});

	}

  setStart(val){
		this.setState({
			startTime:val
		});
	}

	setEnd(val) {
		this.setState({
			endTime:val
		});
	}

	addEvent() {
   	let key  = this.state.jwtToken;

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
				console.log(event.result.htmlLink);
		}) .catch( (error) => {
        console.log(error);
    });    
  }

  render(){

  let addState = (
      <div>
				
				<h2>Book now for {moment(this.state.endTime).diff(this.state.startTime, 'minutes') + 1} minutes</h2>
				
	      <div>
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
		        onClick={this.addEvent.bind(this)}>Submit</button>
		    </div>
      </div>);
      
    let linkToLogin = (
    		<div>Please Log into google before inserting an event</div> 
    );
    
   	return(
   		<div id="Status" className='center-div'>
   			{this.state.loggedIn ? addState : linkToLogin}
   		</div>
   	)

  }
}

 export default Book;
