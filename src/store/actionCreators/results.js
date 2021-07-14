import {
  CREATE_RESULT,
  GET_RESULTS,
  ADD_RESULT,
  DELETE_RESULT,
} from './../actions/index';
import axios from '../../axios-instance/axiosInstance';

export const createResult = (data, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.post(
        `/api/v1/users/addResult/${data.userId}`,
        data
      );
      console.log(res);
      dispatch({ type: ADD_RESULT, payload: res.data.result });
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};

export const getResults = (data, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.get(
        `/api/v1/users/results/${data.batch}/${data.grade}/${data.id}`
      );
      dispatch({ type: GET_RESULTS, payload: res.data.result.allResults });
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};

export const deleteResult = (data, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.patch(
        `/api/v1/users/results/${data.userId}/${data.resultId}`
      );
      dispatch({ type: DELETE_RESULT, payload: { id: data.resultId } });
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};
