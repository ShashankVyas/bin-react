import React from "react";
import { NavLink } from 'react-router-dom';
import  Popup from 'reactjs-popup';

import  User from './User';
import Book from './Book';

export const Header = (props) => {

	return (

			<nav>

				<div>
					<ul>
					<NavLink exact to = "/" className="logo" activeClassName="selected">
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

					<User />

					</ul>
				</div>
			</nav>

			);

};

export default Header;
