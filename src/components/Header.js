import React from "react";
import { NavLink } from 'react-router-dom';

export const Header = (props) => {

	return (

			<nav>
			<div>
			<ul>
			<NavLink exact to = "/" className="unselected" activeClassName="selected">
			<i className="fa fa-home"></i> Home
			</NavLink>
			<NavLink exact to = "/book" className="unselected" activeClassName="selected">
			Book a Meeting
			</NavLink>
			<NavLink exact to = "/ticket" className="unselected" activeClassName="selected">
			Ticket
			</NavLink>
			<NavLink exact to = "/feature" className="unselected" activeClassName="selected">
			Features
			</NavLink>
			<NavLink exact to = "/user" activeClassName="selected" className="signin-btn">
			<img src={require("../images/btn_google_signin_dark_normal_web.png")} alt="Google signin"/>
			</NavLink>
			</ul>
			</div>
			</nav>

			);

};

export default Header;
