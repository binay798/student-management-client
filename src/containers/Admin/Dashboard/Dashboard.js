import React, { useEffect } from 'react';
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
function Dashboard(props) {
  return (
    <div className={classes.dashboard}>
      <div className={classes.dashboard__top}>
        <Paper className={classes.dashboard__top__item}>
          <Icon name='students' />
          <div>
            <h2>Total students</h2>
            <h3>8550</h3>
          </div>
        </Paper>
        <Paper className={classes.dashboard__top__item}>
          <Icon name='teachers' />
          <div>
            <h2>Total teachers</h2>
            <h3>150</h3>
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

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData('Mosh hamadini', 159, 10, 24),
  createData('Angelina stewart', 237, 9, 37),
  createData('Mark hamadini', 262, 2, 24),
  createData('John doe', 305, 5, 1),
  createData('Mary', 356, 3, 8),
];
const TopStudentsTable = () => {
  const styles = useStyles();
  return (
    <div className={classes.topStudents}>
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
            {rows.map((row) => (
              <TableRow
                key={row.name}
                className={classes.topStudents__tableCell}
              >
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>
                  <Avatar
                    style={{ marginLeft: 'auto' }}
                    src='https://blogs-images.forbes.com/danschawbel/files/2017/12/Dan-Schawbel_avatar_1512422077-400x400.jpg'
                  />
                </TableCell>
                <TableCell align='right'>{row.fat}</TableCell>
                <TableCell align='right'>{row.carbs}</TableCell>
                <TableCell align='right'>
                  <Button
                    variant='contained'
                    color='primary'
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
    </div>
  );
};

const TeachersTable = (props) => {
  const globalState = useSelector((state) => state.teachers);
  const dispatch = useDispatch();
  const styles = useStyles();
  // get all teachers
  useEffect(() => {
    // if teachers are present in the globalState then don't fetch data from server
    if (globalState.teachers !== null) return 1;
    // if the teachers are not present
    (async () => {
      try {
        dispatch(actionCreators.getAllTeachers());
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch, globalState.teachers]);

  // change route to user with selected user
  const selectUser = (user) => {
    dispatch(SelectUser(user));
    props.history.push(`/admin/user/${user._id}`);
  };

  // return all the teachers
  return (
    <div className={classes.topStudents}>
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
                    <Avatar
                      style={{ marginLeft: 'auto' }}
                      src='https://blogs-images.forbes.com/danschawbel/files/2017/12/Dan-Schawbel_avatar_1512422077-400x400.jpg'
                    />
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
    </div>
  );
};

export default Dashboard;
