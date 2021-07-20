import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers';
import { interceptor } from '../axios-instance/axiosInstance';

const store = createStore(rootReducers, applyMiddleware(thunk));
interceptor(store);

function Store({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default Store;
