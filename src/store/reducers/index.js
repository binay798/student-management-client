import { combineReducers } from 'redux';
import studentReducers from './studentReducers';
import teacherReducers from './teacherReducers';

const rootReducers = combineReducers({
  teachers: teacherReducers,
  students: studentReducers,
});

export default rootReducers;
