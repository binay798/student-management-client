import {
  GET_ALL_GRADES,
  SELECT_GRADE,
  SELECT_STUDENT,
  UPDATE_STUDENT_ROLL_NUMBER,
} from './../actions/index';
import axios from './../../axios-instance/axiosInstance';

export const createGrade = (data, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      data.allStudents = data.allStudents.map((item) => ({
        rollNumber: 0,
        student: item._id,
      }));
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
      let res = await axios.get('/api/v1/grade?populate=classTeacher');
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
export const selectStudent = (data) => {
  return (dispatch) => {
    dispatch({ type: SELECT_STUDENT, payload: data });
  };
};

export const getSelectedStudent = (data, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.get(
        `/api/v1/grade/${data.gradeId}/${data.studentId}`
      );
      const student = res.data.student;
      dispatch({
        type: SELECT_STUDENT,
        payload: {
          ...student.selectedStudent,
          grade: student.grade,
          batch: student.batch,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};

export const updateStudentRollNumber = (data, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      await axios.patch(
        `/api/v1/grade/${data.gradeId}/${data.studentId}`,
        data
      );
      dispatch({ type: UPDATE_STUDENT_ROLL_NUMBER, payload: data });
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};

// get selected grade and store
export const getSelectedGrade = (id, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      let res = await axios.get(
        `/api/v1/grade?_id=${id}&fields=totalGradeFee,batch,name,allStudents,allSubjects&populate=allStudents.student,allSubjects.teacher`
      );
      dispatch({ type: SELECT_GRADE, payload: res.data.grades[0] });
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
};
