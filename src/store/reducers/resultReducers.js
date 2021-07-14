import {
  GET_RESULTS,
  CREATE_RESULT,
  ADD_RESULT,
  DELETE_RESULT,
} from '../actions';
const initialState = {
  results: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESULTS:
      return {
        ...state,
        results: [...action.payload],
      };
    case CREATE_RESULT:
      return {
        ...state,
      };
    case ADD_RESULT:
      return {
        ...state,
        results: [action.payload, ...state.results],
      };
    case DELETE_RESULT:
      return {
        ...state,
        results: state.results.filter((item) => item._id !== action.payload.id),
      };
    default:
      return state;
  }
};
export default reducer;
