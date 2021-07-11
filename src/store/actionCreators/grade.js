import { GET_ALL_GRADES, SELECT_GRADE } from './../actions/index';
import axios from './../../axios-instance/axiosInstance';

export const createGrade = (data, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      data.allStudents = data.allStudents.map((item) => item._id);
      data.allSubjects = data.allSubjects.map((item) => ({
        name: item.name,
        teacher: item.teacher._id,
      }));
      let res = await axios.post('/api/v1/grade', data);
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};

export const getAllGrades = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(
        '/api/v1/grade?populate=allStudents,allSubjects.teacher,classTeacher'
      );
      dispatch({ type: GET_ALL_GRADES, payload: res.data.grades });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const selectGrade = (data) => {
  return (dispatch) => {
    dispatch({ type: SELECT_GRADE, payload: data });
  };
};
