import { combineReducers } from 'redux';
import studentReducers from './studentReducers';
import teacherReducers from './teacherReducers';
import userReducers from './userReducers';
import imageReducers from './imageReducers';
import gradeReducers from './gradeReducers';
import eventReducers from './eventReducers';

const rootReducers = combineReducers({
  teachers: teacherReducers,
  students: studentReducers,
  user: userReducers,
  image: imageReducers,
  grade: gradeReducers,
  events: eventReducers,
});

export default rootReducers;
