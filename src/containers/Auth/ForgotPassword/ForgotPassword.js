import React, { useState } from 'react';
import classes from './ForgotPassword.module.scss';
import { Paper, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../store/actionCreators/index';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => {
  return {
    inp: {
      width: '100%',
      '& > *': {
        fontSize: '1.4rem',
      },
    },
    btn: {
      width: '100%',
      fontSize: '1.4rem',
    },
  };
});

function ForgotPassword() {
  const dispatch = useDispatch();
  const styles = useStyles();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (email === '') return;
    dispatch(forgotPassword(email, setLoading));
  };
  return (
    <Paper className={classes.forgot}>
      <h2>Forgot password?</h2>
      <form onSubmit={submitHandler} className={classes.forgot__form}>
        <TextField
          classes={{ root: styles.inp }}
          label='Your email address'
          variant='outlined'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          classes={{ root: styles.btn }}
          variant='contained'
          color='primary'
          disabled={loading}
          type='submit'
        >
          {loading ? 'Please wait...' : 'Submit'}
        </Button>
      </form>
      <Link
        to='/'
        style={{ textAlign: 'left', display: 'block', marginTop: '2rem' }}
      >
        Login
      </Link>
    </Paper>
  );
}

export default ForgotPassword;
