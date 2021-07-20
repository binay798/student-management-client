import axios from './../../axios-instance/axiosInstance';
import * as actions from './../actions/index';
export const getAllTeachers = (setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let teachers = await axios.get('/api/v1/users?limit=20&role=teacher');
      dispatch({
        type: actions.GET_ALL_TEACHERS,
        payload: teachers.data.users,
      });
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};
