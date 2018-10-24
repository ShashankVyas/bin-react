import React from "react";
import axios from 'axios';
import moment from "moment";
import TimePicker from 'rc-time-picker';
import Clock from 'react-clock'
import { GOOGLE_API_KEY, CALENDAR_ID } from "../config.js";

const ROUNDING = 30 * 60 * 1000;
const format = 'h:mm a';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  		startTime: moment(),
  		endTime: moment(Math.ceil((+moment().add(15, 'minutes')) / ROUNDING) * ROUNDING),
  		loggedIn: true,
  		jwtToken: null
    };
    this.addEvent = this.addEvent.bind(this);
    this.setStart = this.setStart.bind(this)
    this.setEnd = this.setEnd.bind(this)
  }

  componentDidMount() {
		this.setUserState();
	}

  setUserState() {
	  let userJson = JSON.parse(sessionStorage.getItem('googleUser'));

	  if(userJson !== null){
		 	this.setState((state, props) => ({
		     loggedIn: true,
		     jwtToken:  userJson.tokenObj.token_type +
		     	" " + userJson.tokenObj.access_token
		   }));
	  }else{
		 	this.setState((state, props) => ({
		     loggedIn: false,
		     jwtToken: null
		   }));
	  }
	}

  setStart = async val => {
		await this.setState({
			startTime:val
		});
	}

	setEnd = async val => {
		await this.setState({
			endTime:val
		});
	}

	addEvent() {
   	let token = GOOGLE_API_KEY;
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
			}
		};

		let headers = {
      'Content-Type': 'application/json',
    	'Authorization': key
		};

    axios.post(`https://content.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?alt=json&key=${token}`, postData, {headers: headers})
      .then( function (response) {
 				console.log(response);
	    })
      .catch( (error) => {
        console.log(error);
      });
  }

  render(){

  let addState = (
      <div>

	      <div style={{display: 'inline-block'}}>
	        <Clock
	          value={moment(this.state.startTime).toDate()}
	        />
	      </div>

	      <h3>Book now for {moment(this.state.endTime).diff(this.state.startTime, 'minutes') + 1} minutes</h3>

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

	   		<button
	        className="primary-add"
          buttonText="Submit"
	        onClick={this.addEvent.bind(this)}>Submit</button>

          <button
  	        className="primary-add"
            buttonText="Cancel"
	        onClick={() => document.getElementById("wk-message").style.display="block"}>Cancel</button>
      </div>);

   	return(
   		<div className="appletContainer" id="booker">
   			{this.state.loggedIn && addState}
   		</div>
   	)

  }
}

 export default Book;
