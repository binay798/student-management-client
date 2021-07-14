import * as actionTypes from './../actions/index';
// import produce from 'immer';
const initialState = {
  allGrades: null,
  selectedGrade: null,
  selectedStudent: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_GRADES:
      return {
        ...state,
        allGrades: [...action.payload],
      };
    case actionTypes.SELECT_GRADE:
      return {
        ...state,
        selectedGrade: action.payload,
      };
    case actionTypes.SELECT_STUDENT:
      return {
        ...state,
        selectedStudent: action.payload,
      };
    case actionTypes.UPDATE_STUDENT_ROLL_NUMBER:
      return {
        ...state,
        selectedStudent: {
          ...state.selectedStudent,
          rollNumber: action.payload.rollNumber,
        },
      };
    default:
      return state;
  }
};

export default reducer;
