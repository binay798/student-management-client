import { CREATE_RESULT, GET_RESULTS } from './../actions/index';
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
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const getResults = (data) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(
        `/api/v1/users/results/${data.batch}/${data.grade}/${data.id}`
      );
      dispatch({ type: GET_RESULTS, payload: res.data.result.allResults });
    } catch (err) {
      console.log(err.message);
    }
  };
};
