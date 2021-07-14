import React, { useState, useEffect } from 'react';
import classes from './Student.module.scss';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import {
  updateStudentRollNumber,
  getSelectedStudent,
} from './../../../../store/actionCreators/index';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Student() {
  const globalState = useSelector((state) => state.grade.selectedStudent);
  const [roll, setRoll] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const gradeId = history.location.pathname.split('/')[3];
  const studentId = history.location.pathname.split('/')[4];
  const [loading, setLoading] = useState(false);
  const [rollLoading, setRollLoading] = useState(false);

  useEffect(() => {
    dispatch(getSelectedStudent({ gradeId, studentId }, setLoading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !globalState) {
    return <CircularProgress />;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (roll === 0) return;
    dispatch(
      updateStudentRollNumber(
        {
          rollNumber: roll,
          gradeId: gradeId,
          studentId: studentId,
        },
        setRollLoading
      )
    );
  };
  return (
    <Paper className={classes.student}>
      <div className={classes.student__container}>
        <div className={classes.student__img}>
          <img src={globalState.student.profilePic} alt='user' />
        </div>
        <div className={classes.student__desc}>
          <h2 className={classes.student__head}>Student details</h2>
          {/* Student description */}
          <div className={classes.student__desc__container}>
            <div className={classes.student__desc__content}>
              <p>Fullname:</p>
              <p>
                {globalState.student.firstname} {globalState.student.lastname}
              </p>
            </div>
            <div className={classes.student__desc__content}>
              <p>Email address:</p>
              <p>{globalState.student.email}</p>
            </div>
            <div className={classes.student__desc__content}>
              <p>Roll no.:</p>
              <p>{globalState.rollNumber}</p>
            </div>
            <div className={classes.student__desc__content}>
              <p>Mobile:</p>
              <p>{globalState.student.mobile}</p>
            </div>
            <div className={classes.student__desc__content}>
              <p>Role:</p>
              <p>Student</p>
            </div>
            <div className={classes.student__desc__content}>
              <p>Grade:</p>
              <p>{globalState.grade}</p>
            </div>
            <div className={classes.student__desc__content}>
              <p>Batch:</p>
              <p>{new Date(globalState.batch).getFullYear()}</p>
            </div>
          </div>

          {/* Edit roll number of student */}
          <form
            onSubmit={submitHandler}
            className={classes.student__desc__form}
          >
            <TextField
              variant='outlined'
              className={classes.student__desc__form__inp}
              label='Update roll number'
              type='number'
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
            />
            <Button
              type='submit'
              variant='contained'
              className={classes.btn}
              color='primary'
              disabled={rollLoading}
            >
              {rollLoading ? 'Updating...' : 'Update'}
            </Button>
          </form>
        </div>
      </div>
    </Paper>
  );
}

export default Student;
