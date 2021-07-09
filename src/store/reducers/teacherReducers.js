import {
  UPDATE_TEACHER,
  ADD_TEACHER,
  GET_ALL_TEACHERS,
} from './../actions/index';
import produce from 'immer';

const initialState = {
  teachers: null,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TEACHERS:
      return {
        ...state,
        teachers: [...action.payload],
      };
    case UPDATE_TEACHER:
      let newTeacherArr = produce(state.teachers, (draft) => {
        const index = draft.findIndex(
          (item) => item._id === action.payload._id
        );
        draft.splice(index, 1);
        draft.unshift({ ...action.payload });
      });
      return {
        ...state,
        teachers: [...newTeacherArr],
      };
    case ADD_TEACHER:
      let newArrAfterAdd = produce(state.teachers, (draft) => {
        draft.unshift({ ...action.payload });
      });
      return {
        ...state,
        teachers: newArrAfterAdd,
      };
    default:
      return state;
  }
};

export default reducers;
