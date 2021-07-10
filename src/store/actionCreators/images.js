import axios from './../../axios-instance/axiosInstance';
import * as actionTypes from './../actions/index';
import initializeState from '../../utlis/initializeState';

export const createImage = (file, name, setStateArr, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      if (file) {
        let fd = new FormData();
        fd.append('image', file);
        fd.append('name', name);
        fd.append('createdAt', Date.now());

        let res = await axios.post('/api/v1/images', fd);
        dispatch({
          type: actionTypes.UPDATE_IMAGES_LIST,
          payload: res.data.image,
        });
        initializeState(setStateArr);
      }
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
};

export const getImages = (setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.get('/api/v1/images');
      dispatch({ type: actionTypes.GET_IMAGES, payload: res.data.images });
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};

export const deleteImage = (id, setLoading, setStateArr) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.delete(`/api/v1/images/${id}`);
      dispatch({ type: actionTypes.DELETE_IMAGE, payload: res.data.image });
      initializeState(setStateArr);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
};
