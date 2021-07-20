import React, { useState } from 'react';
import classes from './CreateUser.module.scss';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from '@material-ui/core';
import Icon from './../../../components/UI/Icon/Icon';
import { createUser } from './../../../store/actionCreators/index';
import { useDispatch } from 'react-redux';
import initializeState from '../../../utlis/initializeState';

function CreateUser() {
  const [age, setAge] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [gender, setGender] = useState('male');
  const [loading, setLoading] = useState(false);
  const [grade, setGrade] = useState('');
  const [batch, setBatch] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      firstname !== '' &&
      lastname !== '' &&
      email !== '' &&
      role !== '' &&
      age !== '' &&
      mobile !== '' &&
      gender !== ''
    ) {
      if (password !== '' && confirmPassword !== '') {
        if (password === confirmPassword) {
          // actual code goes here
          dispatch(
            createUser(
              {
                firstname,
                lastname,
                middlename,
                email,
                password,
                confirmPassword,
                age,
                role,
                mobile,
                profilePic: imgUrl,
                gender,
                grade,
                batch,
              },
              setLoading
            )
          );
        } else {
          setError('Password doesnot match');
        }
      } else {
        setError('Please type password and confirm password field');
      }
    } else {
      setError('Please type the fields properly');
    }
    initializeState([
      setFirstname,
      setLastname,
      setMiddlename,
      setEmail,
      setPassword,
      setConfirmPassword,
      setAge,
      setRole,
      setMobile,
      setGender,
      setGrade,
      setBatch,
      setImgUrl,
    ]);
  };

  return (
    <Paper className={classes.user}>
      <h2 className={classes.user__head}>Create new user</h2>
      <div className={classes.user__container}>
        <form onSubmit={submitHandler} className={classes.user__form}>
          {error}
          <div className={classes.user__form__top}>
            <TextField
              label='Firstname'
              className={classes.user__inp}
              variant='outlined'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <TextField
              label='Middlename'
              className={classes.user__inp}
              variant='outlined'
              value={middlename}
              onChange={(e) => setMiddlename(e.target.value)}
            />
            <TextField
              label='Lastname'
              className={classes.user__inp}
              variant='outlined'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className={classes.user__form__bottom}>
            <TextField
              label='Email address'
              type='email'
              className={classes.user__inp}
              variant='outlined'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label='Mobile number'
              type='number'
              className={classes.user__inp}
              variant='outlined'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className={classes.user__form__bottom}>
            <TextField
              label='Age'
              type='number'
              className={classes.user__inp}
              variant='outlined'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <FormControl variant='outlined' className={classes.user__inp}>
              <InputLabel id='demo-simple-select-outlined-label'>
                Role
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label='Role'
              >
                <MenuItem value='' style={{ fontSize: '1.4rem' }}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'student'} style={{ fontSize: '1.4rem' }}>
                  Student
                </MenuItem>
                <MenuItem value={'teacher'} style={{ fontSize: '1.4rem' }}>
                  Teacher
                </MenuItem>
                <MenuItem value={'admin'} style={{ fontSize: '1.4rem' }}>
                  Admin
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              label='Image url'
              type='text'
              className={classes.user__inp}
              variant='outlined'
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </div>

          <div
            className={classes.user__form__bottom}
            style={{ display: role === 'student' ? 'flex' : 'none' }}
          >
            <TextField
              label='Grade'
              type='number'
              className={classes.user__inp}
              variant='outlined'
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
            <TextField
              label='Batch'
              type='number'
              className={classes.user__inp}
              variant='outlined'
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
            />
          </div>
          <div className={classes.user__form__bottom}>
            <FormControl variant='outlined' className={classes.user__inp}>
              <InputLabel htmlFor='outlined-adornment-password'>
                Password
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowPassword(!showPassword)}
                      // onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? (
                        <Icon name='visibilityOn' />
                      ) : (
                        <Icon name='visibilityOff' />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <FormControl variant='outlined' className={classes.user__inp}>
              <InputLabel htmlFor='outlined-adornment-password'>
                Confirm Password
              </InputLabel>
              <OutlinedInput
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      // onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showConfirmPassword ? (
                        <Icon name='visibilityOn' />
                      ) : (
                        <Icon name='visibilityOff' />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </div>

          <div className={classes.user__form__bottom}>
            <FormControl component='fieldset' className={classes.user__inp}>
              <FormLabel component='legend' style={{ fontSize: '1.4rem' }}>
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-label='position'
                name='position'
                defaultValue='top'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value='male'
                  control={<Radio color='primary' />}
                  label='Male'
                  labelPlacement='start'
                />
                <FormControlLabel
                  value='female'
                  control={<Radio color='primary' />}
                  label='Female'
                  labelPlacement='start'
                />
                <FormControlLabel
                  value='other'
                  control={<Radio color='primary' />}
                  label='Other'
                  labelPlacement='start'
                />
              </RadioGroup>
            </FormControl>
          </div>
          <Button
            variant='contained'
            className={classes.user__form__btn}
            color='primary'
            style={{ width: '20rem' }}
            type='submit'
            disabled={loading}
          >
            {loading ? 'Please wait...' : 'Create user'}
          </Button>
        </form>
      </div>
    </Paper>
  );
}

export default CreateUser;
