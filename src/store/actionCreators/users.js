import * as actionTypes from './../actions/index';
import axios from './../../axios-instance/axiosInstance';

export const selectUser = (user) => {
  return { type: actionTypes.SELECT_USER, payload: user };
};

export const getUser = (id, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      dispatch({ type: actionTypes.SELECT_USER, payload: null });

      let res = await axios.get(`/api/v1/users?_id=${id}`);
      dispatch({ type: actionTypes.SELECT_USER, payload: res.data.users[0] });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
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

export const createUser = (data, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.post('/api/v1/users/signup', data);
      if (res.data.user.role === 'student') {
        dispatch({ type: actionTypes.ADD_STUDENT, payload: res.data.user });
      } else if (res.data.user.role === 'teacher') {
        dispatch({ type: actionTypes.ADD_TEACHER, payload: res.data.user });
      }
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};
