import { GET_RESULTS, CREATE_RESULT } from '../actions';
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
    default:
      return state;
  }
};
export default reducer;
