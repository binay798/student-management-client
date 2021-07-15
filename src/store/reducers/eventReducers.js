import { GET_EVENTS, ADD_EVENT } from './../actions/index';
import produce from 'immer';

const initialState = {
  events: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
	...state,
	events: [...action.payload],
      };
    case ADD_EVENT:
      return {
	...state,
	events: [
	  action.payload,
	  ...state.events
	]
      };
    default:
      return state;
  }
};

export default reducers;
