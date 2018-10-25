import React from "react";
import { NavLink } from 'react-router-dom';

import axios from 'axios';
import moment from "moment";

import welcomeImage from "../images/vacancy.png";
import spinner from "../images/spinner.svg";

import Header from "./Header";
import { GOOGLE_API_KEY, CALENDAR_ID} from "../config.js";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment(),
      events: [],
      isBusy: false,
      isEmpty: false,
      isLoading: true,
      endTime: null
    };
  }

  componentDidMount = () => {
    this.getEvents();

    this.clockCounter = setInterval(() => {this.ticker();}, 1000);
    this.eventCounter = setInterval(() => {this.getEvents();}, 60000);
  };

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

   getEvents() {
   	let that = this;
    axios.get(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=15&orderBy=startTime&singleEvents=true&timeMin=${moment().toISOString()}&timeMax=${moment().endOf("day").toISOString()}&key=${GOOGLE_API_KEY}`)
      .then( function (response) {
  					let events = response.data.items;
 												
						if (events.length > 0){	
							let filteredEvents = events.filter(function(item){
							    return item.attendees[0].responseStatus === "accepted";         
							});
              that.setState(
                {
                  events: filteredEvents,
                  isLoading: false,
                  isEmpty: false,
                },
                () => {
                  that.setStatus();
                }
              );
            } else {
              that.setState(
              {
              	events: [],
                isBusy: false,
                isEmpty: true,
                isLoading: false
              })
	      		}
	    })
      .catch( (error) => {
        console.log(error);
      });
  }

  setStatus = () => {
    let now = moment();
    let events = this.state.events;
    for (var e = 0; e < events.length; e++) {
  	
      let eventItem = events[e];
      if (
        now.isBetween(
          moment(eventItem.start.dateTime),
          moment(eventItem.end.dateTime)
        )
      )
       {
        this.setState({
          isBusy: true,
          endTime: eventItem.end.dateTime
        });
        return false;
      } else {
      	sessionStorage.clear('meeting');
        this.setState({
          isBusy: false,
          endTime: null
        });
      }
    }
  };
		render(){

			  const { time, events } = this.state;

			  let eventsList = events.map(function(event) {
			      return (
			        <a
			          className="list-group-item"
			          href={event.htmlLink}
			          target="_blank"
			          key={event.id}
			        >
			          {event.summary}{" "}
			          <span className="badge">
			            {moment(event.start.dateTime).format("h:mm a")},{" "}
			            {moment(event.end.dateTime).diff(
			              moment(event.start.dateTime),
			              "minutes"
			            )}{" "}
			            minutes, {moment(event.start.dateTime).format("MMMM Do")}{" "}
			          </span>
			        </a>
			      );
			  });

	      let emptyState = (
	          <div className="appletContainer">
		          <img src={welcomeImage} alt="Welcome" />
		          <h3>
			          No meetings are scheduled for the day. <u>Sign In with your Google Account to create a new meeting</u>
		          </h3>
	          </div>
	      );

	      let loadingState = (
	    					<div className="loading">
	    					<img src={spinner} alt="Loading..." />
	    					</div>
	    	);

	    	let meetingDuration = (
					 		<span> for {moment(this.state.endTime).diff(
       									moment(this.state.time),"minutes") + 1} minutes</span>
	    	)

        return(				
	        <div className = "home-page">
	        	
	        	<div>
							<Header />
						</div>
						
				 		<div className={this.state.isBusy ? "current-status busy" : "current-status open"}>
	            <div>
						 		<h1 id="currentStatus">{this.state.isBusy ? "BUSY" : "OPEN"} </h1>
						 		{this.state.isBusy && meetingDuration}
						 		<div className="current-time">{moment(time).format('llll')}</div>
	            </div>
	      		</div>
						
						<div id="wk-message">
					 		<div className="upcoming-meetings">
					 			{events.length > 0 && <h1>Upcoming Meetings</h1>}
					 		</div>

						 <div className="list-group">
							 {this.state.isLoading  && loadingState}
							 {this.state.isEmpty  && emptyState}
							 {events.length > 0   && eventsList}
						 </div>
						</div>


							<NavLink className="primary-cta" exact to = "/book"
              onClick= {() => document.getElementById("wk-message").style.display ="none"} id="booker">+</NavLink>
					</div>
				)
		}
}
export default Home;
