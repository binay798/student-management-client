import axios from './../../axios-instance/axiosInstance';
import * as actions from './../actions/index';
export const getAllTeachers = () => {
  return async (dispatch) => {
    try {
      let teachers = await axios.get('/api/v1/users?limit=100&role=teacher');
      dispatch({
        type: actions.GET_ALL_TEACHERS,
        payload: teachers.data.users,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};
