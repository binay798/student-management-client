import React, { useState } from 'react';
import classes from './Login.module.scss';
import { Paper, Tabs, Tab, TextField, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './../../../store/actionCreators/index';

function Login() {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.user);
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // submit form
  const submitHandler = (e) => {
    e.preventDefault();
    let role;
    if (email === '' && password === '') return;
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
    dispatch(login({ email, password, role }, setLoading, history));
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

      <form onSubmit={submitHandler} className={classes.login__form}>
        <TextField
          className={classes.login__form__inp}
          label='Email'
          type='email'
          variant='outlined'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={classes.login__form__inp}
          label='Password'
          type='password'
          variant='outlined'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
