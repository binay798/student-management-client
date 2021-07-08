import React, { useState } from 'react';
import classes from './Login.module.scss';
import { Paper, Tabs, Tab, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Login() {
  const [value, setValue] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
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

      <form className={classes.login__form}>
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
        >
          Submit
        </Button>
      </form>
      <Link to='/admin'>forgot password?</Link>
    </Paper>
  );
}

export default Login;
