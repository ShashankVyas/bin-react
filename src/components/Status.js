import React from "react";
import { connect } from 'react-redux';
import moment from "moment";
import axios from 'axios';

import { GOOGLE_API_KEY, CALENDAR_ID} from "../config.js";

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment(),
      isEmpty: false,
      isLoading: true,
      currentEventEnd: null,
      currentEventID: null
    };
  }

  componentDidMount = () => {
    this.getEvents();
    this.clockCounter = setInterval(() => {this.ticker();}, 1000);
    this.eventCounter = setInterval(() => {this.getEvents();}, 60000);
  };
  
  componentDidUpdate(prevProps) {
     if (this.props.bUpdateNeeded === true) {     	
       this.getEvents();
     }
   }
  
  componentWillUnmount = () => {
    clearInterval(this.clockCounter);
    clearInterval(this.eventCounter);
  };
  
  ticker = () => {
    let time = moment();
    this.setState({
      time: time
    });
  };
  
  openRoom = () =>  {
		this.props.dispatch({ type: 'OPEN_ROOM' });
	}

	busyRoom = () =>  {
		this.props.dispatch({ type: 'BUSY_ROOM' });
	}
	
	setEvents = (val) => {
		this.props.dispatch({ type: 'ADD_EVENTS', value: val });
	}

	clearEvents = () =>  {
		this.props.dispatch({ type: 'CLEAR_EVENTS' });
	}
	
	confirmUpdated = () =>  {
		this.props.dispatch({ type: 'UPDATE_PREFORMED' });
	}

   getEvents() {
   	this.confirmUpdated();
   	let that = this;
    axios.get(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=15&orderBy=startTime&singleEvents=true&timeMin=${moment().toISOString()}&timeMax=${moment()
    .endOf("day").toISOString()}&key=${GOOGLE_API_KEY}`)
      .then( function (response) {
  					let events = response.data.items;
						if (events.length > 0){
							that.setEvents(events);
              that.setState({
                  isLoading: false,
                  isEmpty: false},
                () => {that.setStatus();}
              );
            } else {
            	that.clearEvents();
              that.setState({
                isLoading: false,
                isEmpty: true},
              () => {that.openRoom();}
              );
	      		}
	    }).catch( (error) => {
        console.log(error);
      });   
  }

  setStatus = () => {
    let now = moment();
    let events = this.props.events;
    
    for (var e = 0; e < events.length; e++) {
      let eventItem = events[e];
      if (now.isBetween(
          moment(eventItem.start.dateTime),
          moment(eventItem.end.dateTime))){
      	this.setState({
          currentEventEnd: eventItem.end.dateTime,
          currentEventID: eventItem.id}, 
        	() => {this.busyRoom();}
        );
        return false;
      } 
      else {
        this.setState({
          currentEventEnd: null,
          currentEventID: null}, 
        	() => {this.openRoom();} 
        );
        return true;    
      }
    }
  }
  
  endMeeting  = () =>  {
		let postData = {
			'end': {'dateTime': moment().toISOString()}
		};  	
		
		window.gapi.client.calendar.events.patch({
		  "calendarId": CALENDAR_ID,
		  "eventId": this.state.currentEventID,
		  "sendUpdates": "none",
		  "resource": postData
    }).then( (event) => {
				this.getEvents();
		}) .catch( (error) => {
        console.log(error);
    });
  }
 
		render(){

	    	let meetingDuration = (
              <div>
	       				<div className="center">      						
	       						<div> for {moment(this.state.currentEventEnd).diff(
			       									moment(this.state.time),"minutes") + 1} minutes
			       				</div>
	       				
			              <button
				              className="button"
				              buttontext="Submit"
				              onClick={this.endMeeting}
				            >
				              	End Meeting
			              </button>
			          </div>
		          </div>
	    	)
	    	
        return(
				 		<div className={this.props.isBusy ? "current-status busy" : "current-status open"}>	 				
				 				<div className="current-time">
				 					{moment(this.state.time).format('lll')}
				 				</div>
						 		<h1 id="currentStatus">{this.props.isBusy ? "BUSY" : "OPEN"} </h1>
						 		{this.props.isBusy && meetingDuration}
	          </div>
				)
		}
}

	function mapStateToProps(state) {
	  return {
	    isBusy: state.busyReducer.isBusyStatus,
	    events: state.eventReducer.events,
	    bUpdateNeeded: state.updateReducer.updateNeeded
	  };
	}
	
export default connect(mapStateToProps)(Status);
