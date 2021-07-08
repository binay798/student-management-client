import * as actionTypes from './../actions/index';
import produce from 'immer';
const initialState = {
  images: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_IMAGE:
      return state;
    case actionTypes.GET_IMAGES:
      return {
        ...state,
        images: [...action.payload],
      };
    case actionTypes.UPDATE_IMAGES_LIST:
      let newImagesArr = produce(state.images, (draft) => {
        draft.push(action.payload);
      });
      return {
        ...state,
        images: newImagesArr,
      };
    case actionTypes.DELETE_IMAGE:
      let newImagesAfterDelete = produce(state.images, (draft) => {
        let index = draft.findIndex((item) => item._id === action.payload._id);
        draft.splice(index, 1);
      });

      return {
        ...state,
        images: newImagesAfterDelete,
      };
    default:
      return state;
  }
};

export default reducer;
