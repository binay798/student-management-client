import React, { useState } from 'react';
import classes from './CreateUser.module.scss';
import Paper from '@material-ui/core/Paper';
import { FormHelperText, TextField } from '@material-ui/core';
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
import { useFormik } from 'formik';

// validate input fields
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.mobile) {
    errors.mobile = 'Required';
  }
  if (!values.age) {
    errors.age = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Password doesnot match';
  }

  return errors;
};

function CreateUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      mobile: 0,
      age: 0,
      imgUrl: '',
      grade: '',
      batch: '',
      password: '',
      confirmPassword: '',
      role: 'student',
      gender: 'male',
    },
    validate,
    onSubmit: (vals) => {
      submitHandler();
    },
  });

  const submitHandler = () => {
    dispatch(
      createUser(
        {
          firstname: formik.values.firstName,
          lastname: formik.values.lastName,
          middlename: formik.values.middleName,
          email: formik.values.email,
          password: formik.values.password,
          confirmPassword: formik.values.confirmPassword,
          age: formik.values.age,
          role: formik.values.role,
          mobile: formik.values.mobile,
          profilePic: formik.values.imgUrl,
          gender: formik.values.gender,
          grade: formik.values.grade,
          batch: formik.values.batch,
        },
        setLoading
      )
    );
  };

  return (
    <Paper className={classes.user}>
      <h2 className={classes.user__head}>Create new user</h2>
      <div className={classes.user__container}>
        <form onSubmit={formik.handleSubmit} className={classes.user__form}>
          <div className={classes.user__form__top}>
            <TextField
              label='Firstname'
              className={classes.user__inp}
              variant='outlined'
              name='firstName'
              {...formik.getFieldProps('firstName')}
              error={formik.errors.firstName && formik.touched.firstName}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              label='Middlename'
              className={classes.user__inp}
              variant='outlined'
              name='middleName'
              {...formik.getFieldProps('middleName')}
            />
            <TextField
              label='Lastname'
              className={classes.user__inp}
              variant='outlined'
              name='lastName'
              {...formik.getFieldProps('lastName')}
              error={formik.errors.lastName && formik.touched.lastName}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </div>
          <div className={classes.user__form__bottom}>
            <TextField
              label='Email address'
              type='email'
              className={classes.user__inp}
              variant='outlined'
              name='email'
              {...formik.getFieldProps('email')}
              error={formik.errors.email && formik.touched.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label='Mobile number'
              type='number'
              className={classes.user__inp}
              variant='outlined'
              name='mobile'
              {...formik.getFieldProps('mobile')}
              error={formik.errors.mobile && formik.touched.mobile}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </div>
          <div className={classes.user__form__bottom}>
            <TextField
              label='Age'
              type='number'
              className={classes.user__inp}
              variant='outlined'
              name='age'
              {...formik.getFieldProps('age')}
              error={formik.errors.age && formik.touched.age}
              helperText={formik.touched.age && formik.errors.age}
            />

            <FormControl variant='outlined' className={classes.user__inp}>
              <InputLabel id='demo-simple-select-outlined-label'>
                Role
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                name='role'
                {...formik.getFieldProps('role')}
                label='Role'
                error={formik.errors.role && formik.touched.role}
                // helperText={formik.touched.role && formik.errors.role}
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
              name='imgUrl'
              {...formik.getFieldProps('imgUrl')}
            />
          </div>

          <div
            className={classes.user__form__bottom}
            style={{
              display: formik.values.role === 'student' ? 'flex' : 'none',
            }}
          >
            <TextField
              label='Grade'
              type='number'
              className={classes.user__inp}
              variant='outlined'
              name='grade'
              {...formik.getFieldProps('grade')}
            />
            <TextField
              label='Batch'
              type='number'
              className={classes.user__inp}
              variant='outlined'
              name='batch'
              {...formik.getFieldProps('batch')}
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
                name='password'
                {...formik.getFieldProps('password')}
                error={formik.errors.password && formik.touched.password}
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
              <FormHelperText
                error={formik.errors.password && formik.touched.password}
                id='component-error-text'
              >
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>
            <FormControl variant='outlined' className={classes.user__inp}>
              <InputLabel htmlFor='outlined-adornment-password'>
                Confirm Password
              </InputLabel>
              <OutlinedInput
                type={showConfirmPassword ? 'text' : 'password'}
                name='confirmPassword'
                {...formik.getFieldProps('confirmPassword')}
                error={
                  formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                }
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
              <FormHelperText
                error={
                  formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                }
                id='component-error-text'
              >
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </FormHelperText>
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
                defaultValue='top'
                name='gender'
                {...formik.getFieldProps('gender')}
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
