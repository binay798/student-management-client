import React, { useEffect, useState } from 'react';
import classes from './Students.module.scss';
import { Paper, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import { Button, FormControl, InputLabel, Select } from '@material-ui/core';
import Icon from './../../../components/UI/Icon/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import TableData from '../../../components/TableData/TableData';
import { useSelector, useDispatch } from 'react-redux';
import {
  getStudents,
  selectUser as SelectUser,
} from './../../../store/actionCreators/index';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

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

function Students() {
  return (
    <Paper className={classes.students}>
      <div className={classes.students__top}>
        <form className={classes.students__search}>
          <h2 className={classes.students__head}>List of all students</h2>

          <TextField
            id='outlined-basic'
            className={classes.students__search__inp}
            label='Students...'
            variant='outlined'
          />
          <Button
            startIcon={
              <Icon name='search' style={{ fill: 'white', width: '1.5rem' }} />
            }
            variant='contained'
            color='primary'
          >
            Search
          </Button>
        </form>
        <div className={classes.students__create}>
          <h3>
            <span>Filter options</span>
            <Icon name='filter' />
          </h3>
          <Button
            startIcon={
              <Icon name='plus' style={{ fill: 'white', width: '1.5rem' }} />
            }
            variant='contained'
            color='secondary'
          >
            Create new user
          </Button>
        </div>

        <Filter />
      </div>

      <StickyHeadTable />
    </Paper>
  );
}

function StickyHeadTable() {
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
    dispatch(SelectUser(user));
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
          {/* loading */}
          <Progress loading={loading} />
          <TableBody>
            {globalState.students &&
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
    </Paper>
  );
}

function Filter() {
  const allBatch = [2014, 2015, 2016, 2017, 2018, 2019, 2020];
  const allGrade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className={classes.filter}>
      <FilterOptions name='Batch' options={allBatch} />
      <FilterOptions name='Grade' options={allGrade} />
    </div>
  );
}

function FilterOptions(props) {
  const [age, setAge] = React.useState('');
  return (
    <div>
      <FormControl variant='outlined' className={classes.filter__option}>
        <InputLabel
          style={{ fontSize: '1.4rem' }}
          id='demo-simple-select-outlined-label'
        >
          {props.name}
        </InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          label={props.name}
        >
          <MenuItem value='' style={{ fontSize: '1.4rem' }}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={10} style={{ fontSize: '1.4rem' }}>
            Ten
          </MenuItem>
          <MenuItem value={20} style={{ fontSize: '1.4rem' }}>
            Twenty
          </MenuItem>
          <MenuItem value={30} style={{ fontSize: '1.4rem' }}>
            Thirty
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
export default Students;
