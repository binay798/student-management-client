import { CREATE_PAYMENT, GET_STUDENT_PAYMENT } from '../actions';
const initialState = {
  studentPayments: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAYMENT:
      return {
        ...state,
      };
    case GET_STUDENT_PAYMENT:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default reducer;
