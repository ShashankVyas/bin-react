import { combineReducers } from 'redux'

const eventState = {
	events: []
}

const busyState = {
	sBusyStatus: false
}

const loginState = {
	isLoggedIn: false
}

const updState = {
	updateNeeded: false
}

const capState = {
	capabilities: 
		  [{
					name: "Lights",
					class: "fa fa-lightbulb-o  fa-9x fa-fw",
					active: true
			 },
			 {
					name: "Computer",
					class: "fa fa-desktop  fa-9x fa-fw",
					active: true
			 },
			 {
				 	name: "WiFi/LAN Connectivity",
					class: "fa fa-signal  fa-9x fa-fw",
					active: true
			 },
			 {
				 	name: "Power plug points",
					class: "fa fa-plug  fa-9x fa-fw",
					active: true
			 },
			 {
			 		name: "Projector",
					class: "fa fa-video-camera fa-9x fa-fw",
					active: true
			 },
			 {
			 		name: "Video Conferencing",
					class: "fa fa-camera-retro fa-9x",
					active: true
			 },
			 {
			 		name: "Telephony",
					class: "fa fa-phone fa-9x",
					active: true
			 },
			 {
			 		name: "Capacity: 20",
					class: "fa fa-users fa-9x",
					active: true
			 }
		 ]
	}

const busyReducer = (state = busyState, action) => {
	  switch(action.type) {
    case 'OPEN_ROOM':
      return {
        isBusyStatus: false
      };
    case 'BUSY_ROOM':
      return {
        isBusyStatus: true
      };
    default:
      return state;
  }
}

const eventReducer = (state = eventState, action) => {
	  switch(action.type) {
    case 'ADD_EVENTS':
      return {
        events: action.value
      };
    case 'CLEAR_EVENTS':
      return {
        events: []
      };
    default:
      return state;
  }
}

const loginReducer = (state = loginState, action) => {	
	  switch(action.type) {
    case 'LOG_IN':
      return {
        isLoggedIn: true
      };
    case 'LOG_OUT':
      return {
        isLoggedIn: false
      };
    default:
      return state;
  }
}

const updateReducer = (state = updState, action) => {
	  switch(action.type) {
    case 'UPDATE_EVENTS':
      return {
        updateNeeded: true
      };
		case 'UPDATE_PREFORMED':
      return {
        updateNeeded: false
      };
    default:
      return state;
  }
}

const featureReducer = (state = capState, action) => {
	  switch(action.type) {
    case 'DEACTIVATE_CAP':
	    return {
	        capabilities: state.capabilities.map(cap =>
	            cap.name === action.value ? { ...cap, active: false }  : cap
	        ) 
	    };
		case 'ACTIVATE_CAP':
	    return {
	        capabilities: state.capabilities.map(cap => 
	            cap.name === action.value ? { ...cap, active: true } : cap
	        ) 
	    };
    default:
    	return state;
  	}
}

export const rootReducer = combineReducers({
  busyReducer,
  eventReducer,
  loginReducer,
  updateReducer,
  featureReducer
})