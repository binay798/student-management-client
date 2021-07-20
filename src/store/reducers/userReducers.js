import * as actionTypes from './../actions/index';
const initialState = {
  user: null,
  selectedUser: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case actionTypes.UPDATE_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
