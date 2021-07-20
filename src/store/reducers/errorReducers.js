const initialState = {
  errorMessage: null,
  open: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        errorMessage: action.payload,
        open: true,
      };
    case 'RESET_ERROR':
      return {
        errorMessage: null,
        open: false,
      };
    default:
      return state;
  }
};
export default reducer;
