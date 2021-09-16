import React, { useEffect, useState } from 'react';
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
import {
  Avatar,
  IconButton,
  CircularProgress,
  Button,
  Modal,
  TextField,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Icon from '../../../../components/UI/Icon/Icon';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSelectedGrade,
  addStudentToGrade,
} from './../../../../store/actionCreators/index';
import axios from './../../../../axios-instance/axiosInstance';

function Grade() {
  const globalState = useSelector((state) => state.grade);
  const dispatch = useDispatch();
  const history = useHistory();
  const gradeId = history.location.pathname.split('/')[3];
  const [loading, setLoading] = useState(false);

  // Get selected grade
  useEffect(() => {
    dispatch(getSelectedGrade(gradeId, setLoading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !globalState.selectedGrade) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Paper className={classes.grade}>
      <div className={classes.grade__header}>
        <div className={classes.grade__header__left}>
          <h1 className={classes.grade__head}>
            Grade {globalState.selectedGrade.name}
          </h1>
          <Chip
            label={`Batch ${new Date(
              globalState.selectedGrade.batch
            ).getFullYear()}`}
            color='secondary'
            variant='outlined'
            className={classes.chip}
          />
        </div>
        <div className={classes.grade__header__right}>
          <p>
            <strong>Total annual fee:</strong> Rs
            {globalState.selectedGrade.totalGradeFee}
          </p>
        </div>
      </div>

      <div className={classes.grade__top}>
        <div className={classes.grade__top__left}>
          <StudentTable
            students={globalState.selectedGrade.allStudents}
            gradeId={globalState.selectedGrade._id}
            batch={globalState.selectedGrade.batch}
            class={globalState.selectedGrade.name}
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
  btn: {
    width: '100%',
  },
  inp: {
    width: '100%',
    flex: 1,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    width: '100%',
  },
});

function StudentTable(props) {
  const styles = useStyles();
  // const dispatch = useDispatch();
  const history = useHistory();

  // select student and change route
  const selectCurrentStudent = (data) => {
    history.push(`/admin/grades/${props.gradeId}/${data._id}`);
  };
  return (
    <>
      {/* ADD STUDENT MODAL */}
      <AddStudentModal students={props.students} gradeId={props.gradeId} />

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
                {/* <TableCell
                align='right'
                style={{
                  fontSize: '1.8rem',
                  color: '#666',
                  fontWeight: '400',
                }}
              >
                Batch
              </TableCell> */}
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
                  return (
                    <TableRow key={id} hover role='checkbox' tabIndex={-1}>
                      <TableCell className={classes.table} align='left'>
                        <strong style={{ textTransform: 'capitalize' }}>
                          {row.student.firstname} {row.student.lastname}
                        </strong>
                      </TableCell>
                      <TableCell className={classes.table} align='center'>
                        {row.rollNumber}
                      </TableCell>
                      <TableCell className={classes.table} align='right'>
                        <Avatar
                          alt='Cindy Baker'
                          src={row.student.profilePic}
                          style={{ marginLeft: 'auto' }}
                        />
                      </TableCell>
                      <TableCell className={classes.table} align='right'>
                        {row.student.mobile}
                      </TableCell>
                      {/* <TableCell className={classes.table} align='right'>
                      {new Date(props.batch).getFullYear()}
                    </TableCell> */}
                      <TableCell className={classes.table} align='right'>
                        <IconButton onClick={() => selectCurrentStudent(row)}>
                          <Icon name='eye' style={{ fill: '#444' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

function AddStudentModal(props) {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
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

  const handleClose = () => {
    setOpen(false);
  };

  const checkExistenceOfStudent = (data) => {
    let student;
    if (props.students) {
      student = props.students.find((item) => {
        return item.student._id === data._id;
      });
    }
    return student;
  };
  return (
    <div>
      <Button
        variant='contained'
        style={{ marginBottom: '1rem' }}
        color='primary'
        onClick={() => setOpen(true)}
      >
        Add Student
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Paper className={classes.modal}>
          <form onSubmit={searchStudent} className={classes.modal__form}>
            <TextField
              id='outlined-basic'
              label='Search student'
              variant='outlined'
              classes={{ root: styles.inp }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              classes={{ root: styles.btn }}
              variant='contained'
              color='secondary'
              disabled={searchStudentLoading}
              type='submit'
            >
              Search
            </Button>
          </form>
          <em style={{ marginBottom: '1rem', display: 'block' }}>Results:</em>
          <em>
            {searchedStudents && searchedStudents.length === 0
              ? 'No Students found'
              : null}
          </em>
          {/* ALL THE SEARCHED STUDENTS LISTS */}
          {searchedStudents &&
            searchedStudents.map((item) => {
              let isInGrade = checkExistenceOfStudent(item);
              return (
                <SearchedStudentsList
                  gradeId={props.gradeId}
                  isInGrade={isInGrade}
                  item={item}
                  key={item._id}
                />
              );
            })}
        </Paper>
      </Modal>
    </div>
  );
}

function SearchedStudentsList(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const addStudent = () => {
    dispatch(addStudentToGrade(props.gradeId, props.item._id, setLoading));
  };
  return (
    <div key={props.item._id} className={classes.modal__item}>
      <Avatar alt='Remy Sharp' src={props.item.profilePic} />
      <p>
        {props.item.firstname} {props.item.lastname}
      </p>
      {props.isInGrade ? (
        <p
          style={{
            color: '#a55a3e',
            fontStyle: 'italic',
            fontSize: '1.4rem',
          }}
        >
          ( Already exist )
        </p>
      ) : null}
      <Button
        style={{ marginLeft: 'auto' }}
        variant='outlined'
        color='secondary'
        disabled={props.isInGrade ? true : false}
        onClick={addStudent}
      >
        {loading ? 'Adding...' : 'Add'}
      </Button>
    </div>
  );
}

function SubjectTable(props) {
  const styles = useStyles();

  return (
    <>
      <AddSubjectModal />
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

                <TableCell
                  align='right'
                  style={{
                    fontSize: '1.8rem',
                    color: '#666',
                    fontWeight: '400',
                  }}
                >
                  Act
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.subjects &&
                props.subjects.map((row, id) => {
                  return (
                    <TableRow key={id} hover role='checkbox' tabIndex={-1}>
                      <TableCell className={classes.table} align='left'>
                        <strong style={{ textTransform: 'capitalize' }}>
                          {row.name}
                        </strong>
                      </TableCell>
                      <TableCell className={classes.table} align='center'>
                        {row.teacher.firstname} {row.teacher.lastname}
                      </TableCell>
                      <TableCell className={classes.table} align='right'>
                        {row.teacher.mobile}
                      </TableCell>
                      <TableCell className={classes.table} align='right'>
                        <Button variant='outlined' color='secondary'>
                          <Icon name='trash' />
                        </Button>
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
    </>
  );
}

function AddSubjectModal(props) {
  const [open, setOpen] = React.useState(false);
  const styles = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant='contained'
        style={{ marginBottom: '1rem' }}
        color='primary'
        onClick={() => setOpen(true)}
      >
        Add Subject
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Paper className={classes.modal}>
          <form className={classes.modal__form}>
            <TextField
              id='outlined-basic'
              label='Subject name'
              variant='outlined'
              classes={{ root: styles.inp }}
            />
            <div className={styles.flex}>
              <TextField
                id='outlined-basic'
                label='Search teacher'
                variant='outlined'
                classes={{ root: styles.inp }}
                style={{ width: '100%' }}
              />
              <Button variant='contained' color='primary'>
                <Icon name='search' style={{ fill: 'white' }} />
              </Button>
            </div>

            <Button
              classes={{ root: styles.btn }}
              variant='contained'
              color='secondary'
              type='submit'
            >
              Add
            </Button>
          </form>
        </Paper>
      </Modal>
    </div>
  );
}

export default Grade;
