import React from "react";
import { connect } from 'react-redux';
import moment from "moment";

class Home extends React.Component {
  	
		render(){
			  const events = this.props.events;
			  
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
	          	<div className = "EmptyState">
			          <h3>
				          No more meetings, lets grab some coffee!
			          </h3>
		          </div>
	      );
	    	
       return(
	     
						<div id="wk-message">
					 		<div className="upcoming-meetings">
					 			{events.length > 0 && <h1>Upcoming Meetings</h1>}
						 		<div className="list-group">
								 {events.length === 0   && emptyState}
								 {events.length > 0   && eventsList}
							 </div>
					 		</div>
						</div>
				)
		}
}

	function mapStateToProps(state) {
	  return {
	    events: state.eventReducer.events
	  };
	}
	
export default connect(mapStateToProps)(Home);
