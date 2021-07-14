import React, { useEffect } from 'react';
import classes from './Grades.module.scss';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { Button, FormControl, InputLabel, Select } from '@material-ui/core';
import Icon from './../../../components/UI/Icon/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, IconButton, CircularProgress } from '@material-ui/core';
import { getAllGrades } from './../../../store/actionCreators/index';
import { useDispatch, useSelector } from 'react-redux';

function Grades() {
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
          <Filter />
        </div>
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
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.grade);

  useEffect(() => {
    if (globalState.allGrades) return;
    console.log('passes through');
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
          {/* circular progress */}
          <CircularProgress
            style={{ display: !globalState.allGrades ? 'block' : 'none' }}
          />
          <TableBody>
            {globalState.allGrades &&
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
    </Paper>
  );
}

function Filter() {
  const allBatch = [2014, 2015, 2016, 2017, 2018, 2019, 2020];
  return (
    <div className={classes.filter}>
      <FilterOptions name='Batch' options={allBatch} />
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
export default Grades;
