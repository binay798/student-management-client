import { combineReducers } from 'redux';
import studentReducers from './studentReducers';
import teacherReducers from './teacherReducers';
import userReducers from './userReducers';
import imageReducers from './imageReducers';
import gradeReducers from './gradeReducers';
import resultReducers from './resultReducers';
import paymentReducers from './paymentReducers';

const rootReducers = combineReducers({
  teachers: teacherReducers,
  students: studentReducers,
  user: userReducers,
  image: imageReducers,
  grade: gradeReducers,
  result: resultReducers,
  payment: paymentReducers,
});

export default rootReducers;
