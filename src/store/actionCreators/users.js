import * as actionTypes from './../actions/index';
import axios from './../../axios-instance/axiosInstance';

export const selectUser = (user) => {
  return { type: actionTypes.SELECT_USER, payload: user };
};

export const updateUser = (data, id) => {
  return async (dispatch) => {
    try {
      let res = await axios.patch(`/api/v1/users/update-user/${id}`, data);
      // console.log(res);
      if (res) {
        const user = res.data.user;
        if (user.role === 'student') {
          dispatch({ type: actionTypes.UPDATE_STUDENT, payload: user });
        } else if (user.role === 'teacher') {
          dispatch({ type: actionTypes.UPDATE_TEACHER, payload: user });
        }
        dispatch({ type: actionTypes.SELECT_USER, payload: user });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};
