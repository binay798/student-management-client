import * as actionTypes from './../actions/index';
const initialState = {
  allGrades: null,
  selectedGrade: null,
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
    default:
      return state;
  }
};

export default reducer;
