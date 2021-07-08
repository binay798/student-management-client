import axios from './../../axios-instance/axiosInstance';
import * as actionTypes from './../actions/index';
export const getStudents = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get('/api/v1/users?role=student');
      dispatch({ type: actionTypes.GET_STUDENTS, payload: res.data.users });
    } catch (err) {
      console.log(err.message);
    }
  };
};
