import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import classes from './Grade.module.scss';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { Avatar, IconButton, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Icon from '../../../../components/UI/Icon/Icon';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedGrade } from './../../../../store/actionCreators/index';

function Grade() {
  const globalState = useSelector((state) => state.grade);
  const dispatch = useDispatch();
  const history = useHistory();
  const gradeId = history.location.pathname.split('/')[3];
  const [loading, setLoading] = useState(false);

  // Get selected grade
  useEffect(() => {
    dispatch(getSelectedGrade(gradeId, setLoading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !globalState.selectedGrade) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Paper className={classes.grade}>
      <div className={classes.grade__header}>
        <div className={classes.grade__header__left}>
          <h1 className={classes.grade__head}>
            Grade {globalState.selectedGrade.name}
          </h1>
          <Chip
            label={`Batch ${new Date(
              globalState.selectedGrade.batch
            ).getFullYear()}`}
            color='secondary'
            variant='outlined'
            className={classes.chip}
          />
        </div>
        <div className={classes.grade__header__right}>
          <p>
            <strong>Total annual fee:</strong> Rs
            {globalState.selectedGrade.totalGradeFee}
          </p>
        </div>
      </div>

      <div className={classes.grade__top}>
        <div className={classes.grade__top__left}>
          <StudentTable
            students={globalState.selectedGrade.allStudents}
            gradeId={globalState.selectedGrade._id}
            batch={globalState.selectedGrade.batch}
            class={globalState.selectedGrade.name}
          />
        </div>
        <div className={classes.grade__top__right}>
          <SubjectTable subjects={globalState.selectedGrade.allSubjects} />
        </div>
      </div>
    </Paper>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function StudentTable(props) {
  const styles = useStyles();
  // const dispatch = useDispatch();
  const history = useHistory();

  // select student and change route
  const selectCurrentStudent = (data) => {
    history.push(`/admin/grades/${props.gradeId}/${data._id}`);
  };
  return (
    <Paper className={styles.root}>
      <TableContainer className={styles.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell
                align='left'
                style={{
                  fontSize: '1.8rem',
                  color: '#666',
                  fontWeight: '400',
                }}
              >
                Students
              </TableCell>
              <TableCell
                align='left'
                style={{
                  fontSize: '1.8rem',
                  color: '#666',
                  fontWeight: '400',
                }}
              >
                Roll no.
              </TableCell>
              <TableCell
                align='right'
                style={{
                  fontSize: '1.8rem',
                  color: '#666',
                  fontWeight: '400',
                }}
              >
                Photo
              </TableCell>

              <TableCell
                align='right'
                style={{
                  fontSize: '1.8rem',
                  color: '#666',
                  fontWeight: '400',
                }}
              >
                Mobile
              </TableCell>
              {/* <TableCell
                align='right'
                style={{
                  fontSize: '1.8rem',
                  color: '#666',
                  fontWeight: '400',
                }}
              >
                Batch
              </TableCell> */}
              <TableCell
                align='right'
                style={{
                  fontSize: '1.8rem',
                  color: '#666',
                  fontWeight: '400',
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.students &&
              props.students.map((row, id) => {
                return (
                  <TableRow key={id} hover role='checkbox' tabIndex={-1}>
                    <TableCell className={classes.table} align='left'>
                      {row.student.firstname} {row.student.lastname}
                    </TableCell>
                    <TableCell className={classes.table} align='center'>
                      {row.rollNumber}
                    </TableCell>
                    <TableCell className={classes.table} align='right'>
                      <Avatar
                        alt='Cindy Baker'
                        src={row.student.profilePic}
                        style={{ marginLeft: 'auto' }}
                      />
                    </TableCell>
                    <TableCell className={classes.table} align='right'>
                      {row.student.mobile}
                    </TableCell>
                    {/* <TableCell className={classes.table} align='right'>
                      {new Date(props.batch).getFullYear()}
                    </TableCell> */}
                    <TableCell className={classes.table} align='right'>
                      <IconButton onClick={() => selectCurrentStudent(row)}>
                        <Icon name='eye' style={{ fill: '#444' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

function SubjectTable(props) {
  const styles = useStyles();

  return (
    <Paper className={styles.root}>
      <TableContainer className={styles.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell
                align='left'
                style={{
                  fontSize: '1.8rem',
                  color: '#666',
                  fontWeight: '400',
                }}
              >
                Subject
              </TableCell>
              <TableCell
                align='left'
                style={{
                  fontSize: '1.8rem',
                  color: '#666',
                  fontWeight: '400',
                }}
              >
                Teacher
              </TableCell>
              <TableCell
                align='right'
                style={{
                  fontSize: '1.8rem',
                  color: '#666',
                  fontWeight: '400',
                }}
              >
                Mobile
              </TableCell>

              {/* <TableCell
                align='right'
                style={{
                  fontSize: '1.8rem',
                  color: '#666',
                  fontWeight: '400',
                }}
              >
                Actions
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.subjects &&
              props.subjects.map((row, id) => {
                return (
                  <TableRow key={id} hover role='checkbox' tabIndex={-1}>
                    <TableCell className={classes.table} align='left'>
                      {row.name}
                    </TableCell>
                    <TableCell className={classes.table} align='center'>
                      {row.teacher.firstname} {row.teacher.lastname}
                    </TableCell>
                    <TableCell className={classes.table} align='right'>
                      {row.teacher.mobile}
                    </TableCell>
                    {/* <TableCell className={classes.table} align='right'>
                    <Avatar
                      alt='Cindy Baker'
                      src={imgUrl}
                      style={{ marginLeft: 'auto' }}
                    />
                  </TableCell> */}

                    {/* <TableCell className={classes.table} align='right'>
                    <div>
                      <Link to={`/admin/`}>
                        <IconButton>
                          <Icon name='eye' style={{ fill: '#444' }} />
                        </IconButton>
                      </Link>
                    </div>
                  </TableCell> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Grade;
