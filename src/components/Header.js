import React from "react";
import Popup from "reactjs-popup";

import Feature from "./Feature";
import Ticket from "./Ticket";
import User from "./User";
import Book from "./Book";

export const Header = (props) => {

	return (

				<div className="topnav" id="myTopnav">			
					<Popup trigger={<a href="JavaScript:void(0);">Features</a>}
						modal
					>
					  {close => (
				      <div className="modal">
				        <a href="JavaScript:void(0);"
				        	className="close" onClick={close}>
				          &times;
				        </a>
				        <div className="header center-div"> Features </div>
				        <div className="content">
				        	<Feature />
				        </div>
				      </div>
				    )}
				  </Popup>
					
					<Popup trigger={<a href="JavaScript:void(0);">Open A Ticket</a>}
						modal
						>
					  {close => (
				      <div className="modal">
				        <a href="JavaScript:void(0);"
				        	className="close" onClick={close}>
				          &times;
				        </a>
				        <div className="header center-div"> Open A Ticket </div>
				        <div className="content">
				        	<Ticket />
				        </div>
				      </div>
				    )}
				  </Popup>
				  
					<Popup trigger={<a href="JavaScript:void(0);">Log In</a>}
						modal
					>
						{close => (
				      <div className="modal">
				        <a href="JavaScript:void(0);"
				        	className="close" onClick={close}>
				          &times;
				        </a>
				        <div className="header center-div"> Login </div>
				        <div className="content">
				        	<User />
				        </div>
				      </div>
				    )}
				  </Popup>
				  
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
					
				</div>

			);

};

export default Header;
