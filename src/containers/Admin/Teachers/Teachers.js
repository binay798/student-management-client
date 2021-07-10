import React, { useEffect, useState } from 'react';
import classes from './Teachers.module.scss';
import { Paper, Avatar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import { Button, CircularProgress } from '@material-ui/core';
import Icon from './../../../components/UI/Icon/Icon';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { imgUrl } from '../Admin';

import {
  getAllTeachers,
  selectUser as SelectUser,
} from './../../../store/actionCreators/index';

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
function Teachers() {
  return (
    <Paper className={classes.teachers}>
      <div className={classes.teachers__top}>
        <form className={classes.teachers__search}>
          <h2 className={classes.teachers__head}>List of all teachers</h2>

          <TextField
            id='outlined-basic'
            className={classes.teachers__search__inp}
            label='Teachers...'
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
      </div>

      <StickyHeadTable />
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

function StickyHeadTable() {
  const [loading, setLoading] = useState(false);
  const globalState = useSelector((state) => state.teachers);
  const dispatch = useDispatch();
  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    if (globalState.teachers) return 1;
    dispatch(getAllTeachers(setLoading));
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
              {/* <TableCell
                align='right'
                style={{ fontSize: '1.8rem', color: '#666', fontWeight: '400' }}
              >
                Grade
              </TableCell> */}
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
            {globalState.teachers &&
              globalState.teachers.map((row, id) => {
                return (
                  <TableRow key={id} hover role='checkbox' tabIndex={-1}>
                    <TableCell style={{ fontSize: '1.4rem' }} align='left'>
                      {`${row.firstname} ${row.lastname}`}
                    </TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align='right'>
                      <Avatar
                        alt='Cindy Baker'
                        src={row.profilePic || imgUrl}
                        style={{ marginLeft: 'auto' }}
                      />
                    </TableCell>
                    {/* <TableCell style={{fontSize: '1.4re''}} align='right'>
                      {row.grade}
                    </TableCell> */}
                    <TableCell style={{ fontSize: '1.4rem' }} align='right'>
                      {row.mobile || 'n/a'}
                    </TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align='right'>
                      {new Date(row.batch).getFullYear() || 'n/a'}
                    </TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align='right'>
                      <div>
                        <IconButton onClick={() => selectUser(row)}>
                          <Icon name='eye' style={{ fill: '#444' }} />
                        </IconButton>

                        <IconButton>
                          <Icon name='edit' style={{ fill: '#3f51b5' }} />
                        </IconButton>
                      </div>
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

export default Teachers;
