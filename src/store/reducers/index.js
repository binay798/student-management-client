import { combineReducers } from 'redux';
import studentReducers from './studentReducers';
import teacherReducers from './teacherReducers';
import userReducers from './userReducers';
import imageReducers from './imageReducers';

const rootReducers = combineReducers({
  teachers: teacherReducers,
  students: studentReducers,
  user: userReducers,
  image: imageReducers,
});

export default rootReducers;
