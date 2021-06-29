const initialState = {
  students: null,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STUDENTS':
      return state;
    default:
      return state;
  }
};

export default reducers;
