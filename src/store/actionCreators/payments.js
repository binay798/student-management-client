import { CREATE_PAYMENT, GET_STUDENT_PAYMENTS } from '../actions';
import axios from '../../axios-instance/axiosInstance';

export const createPayment = (data, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.patch('/api/v1/users/payment', data);
      delete data.userId;
      dispatch({ type: CREATE_PAYMENT, payload: res.data.user.allPayments });
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};

export const getStudentPayments = (data) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(
        `/api/v1/users/payment/${data.id}/${data.batch}/${data.grade}`
      );

      if (!res.data.payments) {
        return dispatch({
          type: GET_STUDENT_PAYMENTS,
          payload: [],
        });
      }
      dispatch({
        type: GET_STUDENT_PAYMENTS,
        payload: res.data.payments,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};
