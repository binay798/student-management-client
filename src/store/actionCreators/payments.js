import { CREATE_PAYMENT, GET_STUDENT_PAYMENTS } from '../actions';
import axios from '../../axios-instance/axiosInstance';

export const createPayment = (data) => {
  return async (dispatch) => {
    try {
      let res = await axios.patch('/api/v1/users/payment', data);
      console.log(res);
      delete data.userId;
      dispatch({ type: CREATE_PAYMENT, payload: res.data.user.allPayments });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const getStudentPayments = (id) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`/api/v1/users/payment/${id}`);
      dispatch({
        type: GET_STUDENT_PAYMENTS,
        payload: res.data.payments.allPayments,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};
