import React, { useState } from 'react';
import classes from './CreateGrade.module.scss';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Icon from './../../../../components/UI/Icon/Icon';
import { InputAdornment, Avatar, IconButton, Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from './../../../../axios-instance/axiosInstance';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createGrade } from './../../../../store/actionCreators/index';
import { useDispatch } from 'react-redux';

function CreateGrade() {
  const [teacher, setTeacher] = React.useState('');
  const [studentList, setStudentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [subject, setSubject] = useState('');
  const [subjectList, setSubjectList] = useState([]);
  const [grade, setGrade] = useState('');
  const [batch, setBatch] = useState('');
  const [gradeTotalFee, setGradeTotalFee] = useState(0);
  const [classTeacher, setClassTeacher] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addSubjects = () => {
    if (!subject && !teacher) return;
    let data = {
      name: subject,
      teacher: teacher,
    };
    setSubjectList([data, ...subjectList]);
    setTeacher('');
    setSubject('');
  };

  const submitHandler = () => {
    if (
      grade !== '' &&
      batch !== '' &&
      gradeTotalFee !== 0 &&
      studentList.length !== 0 &&
      teacherList.length !== 0 &&
      classTeacher !== ''
    ) {
      let data = {
        name: grade,
        batch: batch,
        totalGradeFee: gradeTotalFee,
        allStudents: studentList,
        allSubjects: subjectList,
        classTeacher,
      };
      dispatch(createGrade(data, setLoading));
    }
  };

  return (
    <Paper className={classes.grade}>
      <h2 className={classes.grade__head}>Create a new grade</h2>

      <div className={classes.grade__form}>
        <div className={classes.grade__form__top}>
          <TextField
            label='Grade name'
            className={classes.grade__form__inp}
            variant='outlined'
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <TextField
            label='Batch'
            type='number'
            className={classes.grade__form__inp}
            variant='outlined'
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          />
          <TextField
            label='Grade total fee'
            type='number'
            className={classes.grade__form__inp}
            variant='outlined'
            value={gradeTotalFee}
            onChange={(e) => setGradeTotalFee(e.target.value)}
          />
        </div>

        {/* Add students and teachers */}
        <div className={classes.grade__form__add}>
          <div className={classes.grade__form__add__left}>
            {/* Students */}
            <Students
              studentList={studentList}
              setStudentList={setStudentList}
            />
          </div>
          <div className={classes.grade__form__add__right}>
            <Teachers
              teacherList={teacherList}
              setTeacherList={setTeacherList}
            />
          </div>
        </div>

        {/* Add subjects */}
        <div className={classes.grade__form__subjects}>
          <h1>Add Subjects</h1>
          <div style={{ marginBottom: '4rem' }}>
            <TextField
              variant='outlined'
              className={classes.grade__form__inp}
              label='Add subjects'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <FormControl
              variant='outlined'
              className={classes.grade__form__inp}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Select teacher
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                label='Age'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>

                {teacherList.map((item) => {
                  return <MenuItem value={item}>{item.firstname}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <Button
              variant='contained'
              onClick={addSubjects}
              startIcon={
                <Icon
                  name='plus'
                  style={{ fill: 'white', width: '1.5rem', height: '1.5rem' }}
                />
              }
              color='primary'
            >
              Add
            </Button>
          </div>
          {/* Subject lists */}
          <ul className={classes.grade__form__subjects__items}>
            {subjectList.map((item) => {
              return (
                <li>
                  <Avatar src={item.teacher.profilePic} />
                  <p>
                    {item.teacher.firstname} {item.teacher.lastname}
                  </p>
                  <p>
                    <strong>({item.name})</strong>
                  </p>

                  <IconButton style={{ marginLeft: 'auto' }}>
                    <Icon name='trash' style={{ fill: 'coral' }} />
                  </IconButton>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Class teacher */}
        <h2>Select class teacher</h2>
        <FormControl
          variant='outlined'
          className={classes.grade__form__inp}
          style={{ maxWidth: '20rem' }}
        >
          <InputLabel id='demo-simple-select-outlined-label'>
            Select teacher
          </InputLabel>
          <Select
            labelId='demo-simple-select-outlined-label'
            id='demo-simple-select-outlined'
            value={classTeacher}
            onChange={(e) => setClassTeacher(e.target.value)}
            label='Age'
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>

            {teacherList.map((item) => {
              return <MenuItem value={item}>{item.firstname}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <Button
          variant='contained'
          color='primary'
          style={{ marginLeft: 'auto', display: 'block' }}
          onClick={submitHandler}
          disabled={loading}
        >
          {loading ? 'Please wait...' : 'Submit'}
        </Button>
      </div>
    </Paper>
  );
}

function Students(props) {
  const [searchedList, setSearchedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);

  const searchedListStyle = {
    display: searchedList.length === 0 && !userNotFound ? 'none' : 'flex',
  };
  const closeMenu = () => {
    setSearchedList([]);
    setUserNotFound(false);
  };
  const searchStudents = async (e) => {
    try {
      if (e.key !== 'Enter') return;
      setLoading(true);
      let res = await axios.get('/api/v1/users/searchUser/student/' + name);
      setSearchedList(res.data.users);
      if (res.data.users.length === 0) {
        setUserNotFound(true);
      }
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  const selectStudent = (data) => {
    let index = props.studentList.findIndex((item) => item._id === data._id);
    if (index !== -1) {
      setSearchedList([]);
      setName('');
      return;
    }
    props.setStudentList([data, ...props.studentList]);
    setSearchedList([]);
    setName('');
  };

  const removeStudent = (data) => {
    props.setStudentList([
      ...props.studentList.filter((item) => item._id !== data._id),
    ]);
  };
  return (
    <React.Fragment>
      <div className={classes.grade__form__add__search}>
        <TextField
          variant='outlined'
          label='search students'
          className={classes.grade__form__inp}
          style={{ maxWidth: '25rem' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={searchStudents}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Icon name='search' />
              </InputAdornment>
            ),
          }}
        />
        <CircularProgress style={{ display: loading ? 'block' : 'none' }} />

        {/* Searched students list */}
        <div className={classes.searchedList} style={searchedListStyle}>
          <p onClick={closeMenu}>close</p>
          {userNotFound ? (
            <h4 style={{ margin: '0 1rem' }}>Student not found</h4>
          ) : null}
          {searchedList.map((item) => {
            return (
              <div key={item._id} onClick={() => selectStudent(item)}>
                <Avatar src={item.profilePic}>Mark</Avatar>
                <p>
                  {item.firstname} {item.lastname}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <ul>
        {props.studentList.map((item) => {
          return (
            <li key={item._id}>
              <Avatar src={item.profilePic} />
              <p>
                {item.firstname} {item.lastname}
              </p>
              <IconButton
                onClick={() => removeStudent(item)}
                style={{ marginLeft: 'auto' }}
              >
                <Icon name='trash' style={{ fill: 'coral' }} />
              </IconButton>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
}

function Teachers(props) {
  const [searchedList, setSearchedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);

  const searchedListStyle = {
    display: searchedList.length === 0 && !userNotFound ? 'none' : 'flex',
  };

  const closeMenu = () => {
    setSearchedList([]);
    setUserNotFound(false);
  };
  const searchTeacher = async (e) => {
    try {
      if (e.key !== 'Enter') return;
      setLoading(true);
      let res = await axios.get('/api/v1/users/searchUser/teacher/' + name);
      setSearchedList(res.data.users);
      if (res.data.users.length === 0) {
        setUserNotFound(true);
      }
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  const selectTeacher = (data) => {
    let index = props.teacherList.findIndex((item) => item._id === data._id);
    if (index !== -1) {
      setSearchedList([]);
      setName('');
      return;
    }
    props.setTeacherList([data, ...props.teacherList]);
    setSearchedList([]);
    setName('');
  };

  const removeTeacher = (data) => {
    props.setTeacherList([
      ...props.teacherList.filter((item) => item._id !== data._id),
    ]);
  };
  return (
    <React.Fragment>
      <div className={classes.grade__form__add__search}>
        <TextField
          variant='outlined'
          label='search teachers'
          className={classes.grade__form__inp}
          style={{ maxWidth: '25rem' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={searchTeacher}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Icon name='search' />
              </InputAdornment>
            ),
          }}
        />
        <CircularProgress style={{ display: loading ? 'block' : 'none' }} />

        {/* Searched students list */}
        <div className={classes.searchedList} style={searchedListStyle}>
          <p onClick={closeMenu}>close</p>
          {userNotFound ? (
            <h4 style={{ margin: '0 1rem' }}>Teacher not found</h4>
          ) : null}
          {searchedList.map((item) => {
            return (
              <div key={item._id} onClick={() => selectTeacher(item)}>
                <Avatar src={item.profilePic}>Mark</Avatar>
                <p>
                  {item.firstname} {item.lastname}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <ul>
        {props.teacherList.map((item) => {
          return (
            <li key={item._id}>
              <Avatar src={item.profilePic} />
              <p>
                {item.firstname} {item.lastname}
              </p>
              <IconButton
                onClick={() => removeTeacher(item)}
                style={{ marginLeft: 'auto' }}
              >
                <Icon name='trash' style={{ fill: 'coral' }} />
              </IconButton>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
}

export default CreateGrade;
