import React, { useEffect, useState } from 'react';
import classes from './Dashboard.module.scss';
import { Paper } from '@material-ui/core';
import Icon from '../../../components/UI/Icon/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import * as actionCreators from './../../../store/actionCreators/index';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { selectUser as SelectUser } from './../../../store/actionCreators/index';
import { CircularProgress } from '@material-ui/core';
import axios from './../../../axios-instance/axiosInstance';

function Progress(props) {
  const progressStyle = {
    display: props.loading ? 'flex' : 'none',
    padding: '4rem',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <div style={progressStyle}>
      <CircularProgress />
    </div>
  );
}
function Dashboard(props) {
  // Get total number of students
  const [total, setTotal] = useState('');
  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get('/api/v1/users/count');
        setTotal(res.data);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);
  return (
    <div className={classes.dashboard}>
      <div className={classes.dashboard__top}>
        <Paper className={classes.dashboard__top__item}>
          <Icon name='students' />
          <div>
            <h2>Total students</h2>
            <h3>{total.student || '...'}</h3>
          </div>
        </Paper>
        <Paper className={classes.dashboard__top__item}>
          <Icon name='teachers' />
          <div>
            <h2>Total teachers</h2>
            <h3>{total.teacher || '...'}</h3>
          </div>
        </Paper>
        <Paper className={classes.dashboard__top__item}>
          <Icon name='grades' />
          <div>
            <h2>Total classes</h2>
            <h3>10</h3>
          </div>
        </Paper>
      </div>
      {/* bottom content */}
      <div className={classes.dashboard__bottom}>
        <TopStudentsTable {...props} />
      </div>
      <div className={classes.dashboard__bottom}>
        <TeachersTable {...props} />
      </div>
    </div>
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

const TopStudentsTable = (props) => {
  const styles = useStyles();
  const globalState = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // get all teachers
  useEffect(() => {
    // if students are present in the globalState then don't fetch data from server
    if (globalState.students !== null) return 1;
    // if the students are not present
    dispatch(actionCreators.getStudents(setLoading));
  }, [dispatch, globalState.students]);

  // change route to user with selected user
  const selectUser = (user) => {
    dispatch(SelectUser(user));
    props.history.push(`/admin/user/${user._id}`);
  };
  return (
    <Paper className={classes.topStudents}>
      <TableContainer component={Paper} className={styles.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow className={classes.topStudents__tableRow}>
              <TableCell>Top Students</TableCell>
              <TableCell align='right'>Photo</TableCell>
              <TableCell align='right'>Grade</TableCell>
              <TableCell align='right'>Mobile no.</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {globalState.students &&
              globalState.students.map((row) => (
                <TableRow
                  key={row._id}
                  className={classes.topStudents__tableCell}
                >
                  <TableCell component='th' scope='row'>
                    {row.firstname} {row.lastname}
                  </TableCell>
                  <TableCell align='right'>
                    <Avatar style={{ marginLeft: 'auto' }} src={row.profilePic}>
                      {row.firstname}
                    </Avatar>
                  </TableCell>
                  <TableCell align='right'>{row.grade}</TableCell>
                  <TableCell align='right'>{row.mobile}</TableCell>
                  <TableCell align='right'>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => selectUser(row)}
                      startIcon={
                        <Icon
                          name='eye'
                          style={{
                            fill: 'white',
                            width: '1.5rem',
                            height: '1.5rem',
                          }}
                        />
                      }
                      style={{ fontSize: '1.2rem', textTransform: 'none' }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* loading */}
      <Progress loading={loading} />
    </Paper>
  );
};

const TeachersTable = (props) => {
  const globalState = useSelector((state) => state.teachers);
  const dispatch = useDispatch();
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  // get all teachers
  useEffect(() => {
    // if teachers are present in the globalState then don't fetch data from server
    if (globalState.teachers !== null) return 1;
    // if the teachers are not present
    dispatch(actionCreators.getAllTeachers(setLoading));
  }, [dispatch, globalState.teachers]);

  // change route to user with selected user
  const selectUser = (user) => {
    dispatch(SelectUser(user));
    props.history.push(`/admin/user/${user._id}`);
  };

  // return all the teachers
  return (
    <Paper className={classes.topStudents}>
      <TableContainer component={Paper} className={styles.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow className={classes.topStudents__tableRow}>
              <TableCell>Teachers</TableCell>
              <TableCell align='right'>Photo</TableCell>
              <TableCell align='right'>Mobile no.</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {globalState.teachers &&
              globalState.teachers.map((row) => (
                <TableRow
                  key={row._id}
                  className={classes.topStudents__tableCell}
                >
                  <TableCell
                    component='th'
                    scope='row'
                    style={{ textTransform: 'capitalize' }}
                  >
                    {`${row.firstname} ${row.lastname}`}
                  </TableCell>
                  <TableCell align='right'>
                    <Avatar style={{ marginLeft: 'auto' }} src={row.profilePic}>
                      {row.firstname}
                    </Avatar>
                  </TableCell>
                  <TableCell align='right'>{row.mobile}</TableCell>
                  <TableCell align='right'>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => selectUser(row)}
                      startIcon={
                        <Icon
                          name='eye'
                          style={{
                            fill: 'white',
                            width: '1.5rem',
                            height: '1.5rem',
                          }}
                        />
                      }
                      style={{ fontSize: '1.2rem', textTransform: 'none' }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* loading */}
      <Progress loading={loading} />
    </Paper>
  );
};

export default Dashboard;
