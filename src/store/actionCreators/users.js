import * as actionTypes from './../actions/index';
import axios from './../../axios-instance/axiosInstance';

export const selectUser = (user) => {
  return { type: actionTypes.SELECT_USER, payload: user };
};

export const login = (data, setLoading, history) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.post('/api/v1/users/login', data);
      dispatch({ type: actionTypes.LOGIN, payload: res.data.user });
      setLoading(false);

      history.push(`/${res.data.user.role}`);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
};

export const logout = (setLoading, history) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      await axios.get('/api/v1/users/logout');
      dispatch({ type: actionTypes.LOGIN, payload: null });

      history.push('/');
      setLoading(false);
      return;
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
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

export const updateUser = (data, id, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.patch(`/api/v1/users/update-user/${id}`, data);
      // console.log(res);
      if (res) {
        const user = res.data.user;
        if (user.role === 'student') {
          dispatch({ type: actionTypes.UPDATE_SELECTED_USER, payload: user });
        } else if (user.role === 'teacher') {
          dispatch({ type: actionTypes.UPDATE_SELECTED_USER, payload: user });
        }
        dispatch({ type: actionTypes.SELECT_USER, payload: user });
      }
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
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

// update admin user
export const updateAdmin = (data, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.patch(`api/v1/users/update-user/${data.id}`, data);
      dispatch({ type: actionTypes.UPDATE_ADMIN, payload: res.data.user });
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};

export const updatePassword = (data, id, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.patch(`/api/v1/users/updatePassword/${id}`, data);
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};

export const forgotPassword = (email, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.post('/api/v1/users/forgotPassword', { email });
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};

export const resetPassword = (data, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.patch(`/api/v1/users/resetPassword/${data.token}`, {
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};
