import React, { useEffect, useState } from 'react';
import classes from './Grades.module.scss';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { Button, TextField } from '@material-ui/core';
import Icon from './../../../components/UI/Icon/Icon';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, IconButton, CircularProgress } from '@material-ui/core';
import { getAllGrades } from './../../../store/actionCreators/index';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../axios-instance/axiosInstance';

function Grades() {
  const [batch, setBatch] = useState('');
  const [filteredGrades, setFilteredGrades] = useState(null);

  const getFilteredGrades = async (e) => {
    e.preventDefault();
    try {
      if (batch === '') return;
      let res = await axios.get(
        `/api/v1/grade?batch=${batch}&populate=allStudents,classTeacher`
      );
      setFilteredGrades(res.data.grades);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Paper className={classes.grades}>
      <div className={classes.grades__top}>
        <div className={classes.grades__search}>
          <h2 className={classes.grades__head}>List of all grades</h2>
          <Link to='/admin/createGrade'>
            <Button
              startIcon={
                <Icon name='plus' style={{ fill: 'white', width: '1.5rem' }} />
              }
              variant='contained'
              color='secondary'
            >
              Create new grade
            </Button>
          </Link>
        </div>

        <div className={classes.grades__create}>
          <h3>
            <span>Filter options</span>
            <Icon name='filter' />
          </h3>
          <form onSubmit={getFilteredGrades}>
            <TextField
              label='Batch'
              variant='outlined'
              type='number'
              className={classes.inp}
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
            />
          </form>
          <Icon
            name='refresh'
            onClick={() => setFilteredGrades(null)}
            className={classes.refresh}
          />
        </div>
      </div>

      <StickyHeadTable filteredGrades={filteredGrades} />
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

function StickyHeadTable(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.grade);
  // const [filteredGrades, setFilteredGrades] = useState(null);

  useEffect(() => {
    if (globalState.allGrades) return;
    dispatch(getAllGrades());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // select grade and change route
  const changeRoute = (data) => {
    history.push('/admin/grades/' + data._id);
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
                Class teacher
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
            {/* Grades after filter */}
            {props.filteredGrades &&
              props.filteredGrades.map((row, id) => {
                return (
                  <TableRow key={id} hover role='checkbox' tabIndex={-1}>
                    <TableCell style={{ fontSize: '1.6rem' }} align='left'>
                      {row.classTeacher.firstname} {row.classTeacher.lastname}
                    </TableCell>
                    <TableCell style={{ fontSize: '1.6rem' }} align='right'>
                      <Avatar
                        alt='Cindy Baker'
                        src={row.classTeacher.profilePic}
                        style={{ marginLeft: 'auto' }}
                      />
                    </TableCell>
                    <TableCell style={{ fontSize: '1.6rem' }} align='right'>
                      {row.name}
                    </TableCell>
                    <TableCell style={{ fontSize: '1.6rem' }} align='right'>
                      {row.classTeacher.mobile || 'n/a'}
                    </TableCell>
                    <TableCell style={{ fontSize: '1.6rem' }} align='right'>
                      {new Date(row.batch).getFullYear() || 'n/a'}
                    </TableCell>
                    <TableCell style={{ fontSize: '1.6rem' }} align='right'>
                      <IconButton onClick={() => changeRoute(row)}>
                        <Icon name='eye' style={{ fill: '#444' }} />
                      </IconButton>

                      <IconButton>
                        <Icon name='edit' style={{ fill: '#3f51b5' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            {/* if grades are not filtered */}
            {!props.filteredGrades &&
              globalState.allGrades &&
              globalState.allGrades.map((row, id) => {
                return (
                  <TableRow key={id} hover role='checkbox' tabIndex={-1}>
                    <TableCell style={{ fontSize: '1.6rem' }} align='left'>
                      {row.classTeacher.firstname} {row.classTeacher.lastname}
                    </TableCell>
                    <TableCell style={{ fontSize: '1.6rem' }} align='right'>
                      <Avatar
                        alt='Cindy Baker'
                        src={row.classTeacher.profilePic}
                        style={{ marginLeft: 'auto' }}
                      />
                    </TableCell>
                    <TableCell style={{ fontSize: '1.6rem' }} align='right'>
                      {row.name}
                    </TableCell>
                    <TableCell style={{ fontSize: '1.6rem' }} align='right'>
                      {row.classTeacher.mobile || 'n/a'}
                    </TableCell>
                    <TableCell style={{ fontSize: '1.6rem' }} align='right'>
                      {new Date(row.batch).getFullYear() || 'n/a'}
                    </TableCell>
                    <TableCell style={{ fontSize: '1.6rem' }} align='right'>
                      <IconButton onClick={() => changeRoute(row)}>
                        <Icon name='eye' style={{ fill: '#444' }} />
                      </IconButton>

                      <IconButton>
                        <Icon name='edit' style={{ fill: '#3f51b5' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* circular progress */}
      {/* <CircularProgress
        style={{ display: !globalState.allGrades ? 'block' : 'none' }}
      /> */}
      <Progress loading={!globalState.allGrades} />
    </Paper>
  );
}

export default Grades;
