import React from "react";
import { NavLink } from 'react-router-dom';
import  Popup from 'reactjs-popup';

import Book from './Book';

export const Header = (props) => {

	return (

			<nav>

				<div>
					<ul>
					<NavLink exact to = "/" className="unselected" activeClassName="selected">
						<i className="fa fa-home"></i> SAM
					</NavLink>

					<Popup trigger={<a href="JavaScript:void(0);">Book A Meeting</a>}
						modal
					>
						{close => (
				      <div className="modal">
				        <a href="JavaScript:void(0);"
				        	className="close" onClick={close}>
				          &times;
				        </a>
				        <div className="header center-div"> Quick Book </div>
				        <div className="content">
				        	<Book />
				        </div>
				      </div>
				    )}
				  </Popup>

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
