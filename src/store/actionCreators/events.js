import axios from './../../axios-instance/axiosInstance';
import * as actionTypes from './../actions/index';

export const getEvents = (setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try{
      let res = await axios.get('api/v1/events?sort=-createdAt');
      dispatch({ type: actionTypes.GET_EVENTS, payload: res.data.events });
    } catch(err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};

export const addEvent = (data) => {
  return async (dispatch) => {
    try{
      let res = await axios.post('/api/v1/events', data);
      //console.log(res);
      dispatch({ type: actionTypes.ADD_EVENT, payload: res.data.event });
    }
    catch (err) {
      console.log(err.message);
    }
  };
}
