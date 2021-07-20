import axios from './../../axios-instance/axiosInstance';
import * as actionTypes from './../actions/index';

export const getStudents = (setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.get('/api/v1/users?role=student&limit=20');
      dispatch({ type: actionTypes.GET_STUDENTS, payload: res.data.users });
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};

export const getTotalStudents = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get('/api/v1/users/count/student');
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };
};
