import React from "react";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import  User from './User';

class Header extends React.Component {

	render() {	
		return (

				<nav>
					<div className= {this.props.isBusy ? "topnav topnav-closed" : "topnav topnav-open"}>
						<ul>
						<NavLink to = "/" className="unselected" activeClassName="selected">
							<i className="fa fa-home"></i> SAM
						</NavLink>
					  
					  <NavLink to = "/book" className="unselected" activeClassName="selected">
							Quick Book
						</NavLink>

						<NavLink to = "/ticket" className="unselected" activeClassName="selected">
							Ticket
						</NavLink>

						<NavLink to = "/feature" className="unselected" activeClassName="selected">
							Features
						</NavLink>

						<User />
						
						</ul>
					</div>
				</nav>

				);
	}

};

	function mapStateToProps(state) {
	  return {
	    isBusy: state.busyReducer.isBusyStatus
	  };
	}
	
export default connect(mapStateToProps)(Header);
