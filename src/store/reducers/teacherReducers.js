const initialState = {
  teachers: null,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TEACHERS':
      return state;
    default:
      return state;
  }
};

export default reducers;
