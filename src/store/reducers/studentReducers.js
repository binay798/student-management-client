import { GET_STUDENTS, UPDATE_STUDENT } from './../actions/index';
import produce from 'immer';

const initialState = {
  students: null,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        students: [...action.payload],
      };
    case UPDATE_STUDENT:
      let newStudentArr = produce(state.students, (draft) => {
        const index = draft.findIndex(
          (item) => item._id === action.payload._id
        );
        draft.splice(index, 1);
        draft.unshift({ ...action.payload });
      });
      return {
        ...state,
        students: [...newStudentArr],
      };
    default:
      return state;
  }
};

export default reducers;
