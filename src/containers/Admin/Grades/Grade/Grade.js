import React from 'react';
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
import { Avatar, IconButton } from '@material-ui/core';
import { imgUrl } from './../../Admin';
import { Link } from 'react-router-dom';
import Icon from '../../../../components/UI/Icon/Icon';

function Grade() {
  return (
    <Paper className={classes.grade}>
      <div className={classes.grade__header}>
        <div className={classes.grade__header__left}>
          <h1 className={classes.grade__head}>Grade 10</h1>
          <Chip
            label='Batch 2021'
            color='secondary'
            variant='outlined'
            className={classes.chip}
          />
        </div>
        <div className={classes.grade__header__right}>
          <p>
            <strong>Total annual fee:</strong> Rs 24,000
          </p>
        </div>
      </div>

      <div className={classes.grade__top}>
        <div className={classes.grade__top__left}>
          <StudentTable />
        </div>
        <div className={classes.grade__top__right}>
          <SubjectTable />
        </div>
      </div>
    </Paper>
  );
}

function createData(name, roll, photo, grade, mobile, batch) {
  return { name, roll, photo, grade, mobile, batch };
}

const rows = [
  createData('John Doe', 1, 'photo', 1, 3287263, 2012),
  createData('Christine', 3, 'photo', 2, 9596961, 2021),
  createData('Junie', 9, 'photo', 3, 301340, 2019),
  createData('Mark', 12, 'photo', 4, 9833520, 2018),
  createData('Mosh', 11, 'photo', 5, 9984670, 2015),
  createData('Mandy Lim', 5, 'photo', 6, 7692024, 2016),
  createData('Telusko', 4, 'photo', 7, 357578, 2020),
  createData('Jennifer', 14, 'photo', 8, 70273, 2018),
  createData('Prince', 13, 'photo', 9, 1972550, 2014),
  createData('Bob', 16, 'photo', 10, 377973, 2016),
  createData('Jeremy', 18, 'photo', 5, 640679, 2017),
  createData('Qazi', 20, 'photo', 2, 242495, 2021),
  createData('Josh', 21, 'photo', 3, 17098246, 2021),
  createData('Jonas', 23, 'photo', 8, 923768, 2016),
  createData('Brazil', 17, 'photo', 6, 8515767, 2013),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function StudentTable() {
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
              <TableCell
                align='right'
                style={{
                  fontSize: '1.8rem',
                  color: '#666',
                  fontWeight: '400',
                }}
              >
                Batch
              </TableCell>
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
            {rows.map((row, id) => {
              return (
                <TableRow key={id} hover role='checkbox' tabIndex={-1}>
                  <TableCell className={classes.table} align='left'>
                    {row.name}
                  </TableCell>
                  <TableCell className={classes.table} align='center'>
                    {row.roll}
                  </TableCell>
                  <TableCell className={classes.table} align='right'>
                    <Avatar
                      alt='Cindy Baker'
                      src={imgUrl}
                      style={{ marginLeft: 'auto' }}
                    />
                  </TableCell>
                  <TableCell className={classes.table} align='right'>
                    {row.mobile}
                  </TableCell>
                  <TableCell className={classes.table} align='right'>
                    {row.batch}
                  </TableCell>
                  <TableCell className={classes.table} align='right'>
                    <div>
                      <Link to={`/admin/grades/dsaf/ekladj;`}>
                        <IconButton>
                          <Icon name='eye' style={{ fill: '#444' }} />
                        </IconButton>
                      </Link>
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

const createSubjectData = (sub, teacherName, num) => {
  return { sub, teacherName, num };
};
const subjectRows = [
  createSubjectData('Math', 'John Doe', 9856471236),
  createSubjectData('Physics', 'Mike', 9856471236),
  createSubjectData('Zoology', 'Monty', 9856471236),
  createSubjectData('Botany', 'Sham', 9856471236),
  createSubjectData('Chemistry', 'Jeniffer', 9856471236),
  createSubjectData('Computer science', 'Mandy', 9856471236),
  createSubjectData('English', 'Dane', 9856471236),
  createSubjectData('Nepali', 'Joe', 9856471236),
  createSubjectData('Math', 'Jolly', 9856471236),
  createSubjectData('Math', 'John Doe', 9856471236),
];

function SubjectTable() {
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
            {subjectRows.map((row, id) => {
              return (
                <TableRow key={id} hover role='checkbox' tabIndex={-1}>
                  <TableCell className={classes.table} align='left'>
                    {row.sub}
                  </TableCell>
                  <TableCell className={classes.table} align='center'>
                    {row.teacherName}
                  </TableCell>
                  <TableCell className={classes.table} align='right'>
                    {row.num}
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
