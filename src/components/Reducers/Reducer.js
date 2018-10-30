import { combineReducers } from 'redux'

function busyReducer(state = {isBusyStatus: false}, action) {
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

function eventReducer(state = {events: []}, action) {
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

function loginReducer(state = {isLoggedIn: false}, action) {
	
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

function updateReducer(state = {updateNeeded: false}, action) {
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

export const rootReducer = combineReducers({
  busyReducer,
  eventReducer,
  loginReducer,
  updateReducer
})