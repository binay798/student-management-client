import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
});

export const interceptor = (store) => {
  axiosInstance.interceptors.response.use(null, (err) => {
    console.log(err.response);
    if (err.response) {
      store.dispatch({ type: 'ERROR', payload: err.response.data.message });
    } else {
      store.dispatch({ type: 'ERROR', payload: 'Something went wrong' });
    }
  });
};
export default axiosInstance;
