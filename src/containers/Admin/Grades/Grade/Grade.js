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
import { useSelector } from 'react-redux';

function Grade() {
  const globalState = useSelector((state) => state.grade);

  if (globalState.selectedGrade === null) {
    return <p>Grade not selected</p>;
  }
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
          <StudentTable
            students={globalState.selectedGrade.allStudents}
            gradeId={globalState.selectedGrade._id}
          />
        </div>
        <div className={classes.grade__top__right}>
          <SubjectTable subjects={globalState.selectedGrade.allSubjects} />
        </div>
      </div>
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

function StudentTable(props) {
  const styles = useStyles();
  console.log(props);
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
            {props.students &&
              props.students.map((row, id) => {
                // console.log(row);
                return (
                  <TableRow key={id} hover role='checkbox' tabIndex={-1}>
                    <TableCell className={classes.table} align='left'>
                      {row.firstname} {row.lastname}
                    </TableCell>
                    <TableCell className={classes.table} align='center'>
                      {row.roll}
                    </TableCell>
                    <TableCell className={classes.table} align='right'>
                      <Avatar
                        alt='Cindy Baker'
                        src={row.profilePic}
                        style={{ marginLeft: 'auto' }}
                      />
                    </TableCell>
                    <TableCell className={classes.table} align='right'>
                      {row.mobile}
                    </TableCell>
                    <TableCell className={classes.table} align='right'>
                      {new Date(row.batch).getFullYear()}
                    </TableCell>
                    <TableCell className={classes.table} align='right'>
                      <div>
                        <Link to={`/admin/grades/${props.gradeId}/${row._id};`}>
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

function SubjectTable(props) {
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
            {props.subjects &&
              props.subjects.map((row, id) => {
                return (
                  <TableRow key={id} hover role='checkbox' tabIndex={-1}>
                    <TableCell className={classes.table} align='left'>
                      {row.name}
                    </TableCell>
                    <TableCell className={classes.table} align='center'>
                      {row.teacher.firstname} {row.teacher.lastname}
                    </TableCell>
                    <TableCell className={classes.table} align='right'>
                      {row.teacher.mobile}
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
