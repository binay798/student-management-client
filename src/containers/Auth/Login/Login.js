import React, { useState } from 'react';
import classes from './Login.module.scss';
import { Paper, Tabs, Tab, TextField, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './../../../store/actionCreators/index';
import { useFormik } from 'formik';

// validate input fields
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be greater than 6 digits or letters';
  }
  return errors;
};

function Login() {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.user);
  const history = useHistory();
  const [value, setValue] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (vals) => {
      submitHandler();
    },
  });
  // submit form
  const submitHandler = () => {
    let role;
    if (value === 0) {
      // student login
      role = 'student';
    } else if (value === 1) {
      // teacher login
      role = 'teacher';
    } else {
      // admin login
      role = 'admin';
    }
    dispatch(
      login(
        { email: formik.values.email, password: formik.values.password, role },
        setLoading,
        history
      )
    );
  };

  return (
    <Paper className={classes.login}>
      <Tabs
        value={value}
        onChange={handleChange}
        style={{ fontSize: '1.6rem' }}
      >
        <Tab label='Login as student' className={classes.login__tab} />
        <Tab label='Login as teacher' className={classes.login__tab} />
        <Tab label='Login as admin' className={classes.login__tab} />
      </Tabs>

      <form onSubmit={formik.handleSubmit} className={classes.login__form}>
        <TextField
          error={formik.errors.email && formik.touched.email}
          className={classes.login__form__inp}
          label='Email'
          name='email'
          type='email'
          variant='outlined'
          {...formik.getFieldProps('email')}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          error={formik.errors.password && formik.touched.password}
          className={classes.login__form__inp}
          label='Password'
          type='password'
          variant='outlined'
          name='password'
          {...formik.getFieldProps('password')}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          variant='contained'
          className={classes.login__form__btn}
          color='primary'
          type='submit'
          disabled={loading}
        >
          {loading ? 'Please wait...' : 'Submit'}
        </Button>
      </form>
      <Link to='/auth/forgotPassword'>forgot password?</Link>
      {globalState.user && (
        <div>
          <Link to={`/${globalState.user.role}`}>
            <Button
              style={{ fontSize: '1.4rem' }}
              variant='contained'
              color='secondary'
            >
              Go to dashboard
            </Button>
          </Link>
        </div>
      )}
    </Paper>
  );
}

export default Login;
