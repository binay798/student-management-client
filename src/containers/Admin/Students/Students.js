import React, { useEffect, useState } from 'react';
import classes from './Students.module.scss';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Icon from './../../../components/UI/Icon/Icon';
import TableData from '../../../components/TableData/TableData';
import { useSelector, useDispatch } from 'react-redux';
import { getStudents } from './../../../store/actionCreators/index';
import { useHistory, Link } from 'react-router-dom';
import axios from '../../../axios-instance/axiosInstance';
import Progress from '../../../components/UI/ProgressBar/ProgressBar';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function Students() {
  const [name, setName] = useState('');
  const [searchedStudents, setSearchedStudents] = useState(null);
  const [searchStudentLoading, setSearchStudentLoading] = useState(false);

  // search student based on name
  const searchStudent = async (e) => {
    e.preventDefault();
    setSearchStudentLoading(true);
    try {
      if (name === '') throw new Error('Enter valid name');
      let res = await axios.get('/api/v1/users/searchUser/student/' + name);
      setSearchedStudents(res.data.users);
    } catch (err) {
      console.log(err.message);
    }
    setSearchStudentLoading(false);
    setName('');
  };
  return (
    <Paper className={classes.students}>
      <div className={classes.students__top}>
        <form onSubmit={searchStudent} className={classes.students__search}>
          <h2 className={classes.students__head}>List of all students</h2>
          <Icon
            name='refresh'
            onClick={() => setSearchedStudents(null)}
            className={classes.refresh}
          />
          <TextField
            id='outlined-basic'
            className={classes.students__search__inp}
            label='Students...'
            variant='outlined'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            startIcon={
              <Icon name='search' style={{ fill: 'white', width: '1.5rem' }} />
            }
            variant='contained'
            color='primary'
            disabled={searchStudentLoading}
            type='submit'
          >
            {searchStudentLoading ? 'Searching...' : 'Search'}
          </Button>
        </form>
        <div className={classes.students__create}>
          <Link to='/admin/createUser'>
            <Button
              startIcon={
                <Icon name='plus' style={{ fill: 'white', width: '1.5rem' }} />
              }
              variant='contained'
              color='secondary'
            >
              Create new user
            </Button>
          </Link>
        </div>
      </div>

      <MemoizedStickyTable searchedStudents={searchedStudents} />
    </Paper>
  );
}

function StickyHeadTable(props) {
  const [loading, setLoading] = useState(false);
  const globalState = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    if (globalState.students) return 1;
    dispatch(getStudents(setLoading));
  }, [dispatch, globalState]);

  // change route to user with selected user
  const selectUser = (user) => {
    history.push(`/admin/user/${user._id}`);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell
                align='left'
                style={{ fontSize: '1.8rem', color: '#666', fontWeight: '400' }}
              >
                Name
              </TableCell>
              <TableCell
                align='right'
                style={{ fontSize: '1.8rem', color: '#666', fontWeight: '400' }}
              >
                Photo
              </TableCell>
              <TableCell
                align='right'
                style={{ fontSize: '1.8rem', color: '#666', fontWeight: '400' }}
              >
                Grade
              </TableCell>
              <TableCell
                align='right'
                style={{ fontSize: '1.8rem', color: '#666', fontWeight: '400' }}
              >
                Mobile
              </TableCell>
              <TableCell
                align='right'
                style={{ fontSize: '1.8rem', color: '#666', fontWeight: '400' }}
              >
                Batch
              </TableCell>
              <TableCell
                align='right'
                style={{ fontSize: '1.8rem', color: '#666', fontWeight: '400' }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* if empty student then */}
            {props.searchedStudents && props.searchedStudents.length === 0 ? (
              <TableRow>
                <TableCell>No student found</TableCell>
              </TableRow>
            ) : null}
            {/* if there is searched student */}
            {props.searchedStudents &&
              props.searchedStudents.length !== 0 &&
              props.searchedStudents.map((item, id) => {
                return (
                  <TableRow key={id} hover role='checkbox' tabIndex={-1}>
                    <TableData {...item} selectUser={selectUser} type='user' />
                  </TableRow>
                );
              })}
            {/* Default list of students */}
            {!props.searchedStudents &&
              globalState.students &&
              globalState.students.map((row, id) => {
                return (
                  <TableRow key={id} hover role='checkbox' tabIndex={-1}>
                    <TableData {...row} selectUser={selectUser} type='user' />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* loading */}
      <Progress loading={loading} />
    </Paper>
  );
}

const MemoizedStickyTable = React.memo(StickyHeadTable);

export default Students;
