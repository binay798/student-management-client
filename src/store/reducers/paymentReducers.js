import { CREATE_PAYMENT, GET_STUDENT_PAYMENTS } from '../actions';
const initialState = {
  studentPayments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAYMENT:
      return {
        ...state,
        studentPayments: action.payload,
      };
    case GET_STUDENT_PAYMENTS:
      return {
        ...state,
        studentPayments: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
