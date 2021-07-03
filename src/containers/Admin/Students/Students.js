import React from 'react';
import classes from './Students.module.scss';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import { Button, FormControl, InputLabel, Select } from '@material-ui/core';
import Icon from './../../../components/UI/Icon/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import TableData from '../../../components/TableData/TableData';

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

const tableHead = ['name', 'photo', 'grade', 'mobile', 'batch'];

function createData(name, photo, grade, mobile, batch) {
  return { name, photo, grade, mobile, batch };
}

const rows = [
  createData('John Doe', 'IN', 1, 3287263, 2012),
  createData('Christine', 'CN', 2, 9596961, 2021),
  createData('Junie', 'IT', 3, 301340, 2019),
  createData('Mark', 'US', 4, 9833520, 2018),
  createData('Mosh', 'CA', 5, 9984670, 2015),
  createData('Mandy Lim', 'AU', 6, 7692024, 2016),
  createData('Telusko', 'DE', 7, 357578, 2020),
  createData('Jennifer', 'IE', 8, 70273, 2018),
  createData('Prince', 'MX', 9, 1972550, 2014),
  createData('Bob', 'JP', 10, 377973, 2016),
  createData('Jeremy', 'FR', 5, 640679, 2017),
  createData('Qazi', 'GB', 2, 242495, 2021),
  createData('Josh', 'RU', 3, 17098246, 2021),
  createData('Jonas', 'NG', 8, 923768, 2016),
  createData('Brazil', 'BR', 6, 8515767, 2013),
];

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, id) => {
                return (
                  <TableRow key={id} hover role='checkbox' tabIndex={-1}>
                    <TableData {...row} type='user' />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
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
