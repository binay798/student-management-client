import React from 'react';
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

function Dashboard() {
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
        <TopStudentsTable />
      </div>
      <div className={classes.dashboard__bottom}>
        <TeachersTable />
      </div>
    </div>
  );
}

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
  return (
    <div className={classes.topStudents}>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
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

const teachersRow = [
  createData('Mosh hamadini', 159, 10, 9854623457),
  createData('Angelina stewart', 237, 9, 9847563214),
  createData('Mark hamadini', 262, 2, 9843105746),
  createData('John doe', 305, 5, 9863257415),
  createData('Mary', 356, 3, 9874613528),
];

const TeachersTable = () => {
  return (
    <div className={classes.topStudents}>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow className={classes.topStudents__tableRow}>
              <TableCell>Teachers</TableCell>
              <TableCell align='right'>Photo</TableCell>
              <TableCell align='right'>Class teacher</TableCell>
              <TableCell align='right'>Mobile no.</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachersRow.map((row) => (
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

export default Dashboard;
