import React, { useState } from 'react';
import classes from './ResetPassword.module.scss';
import { Paper, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../../store/actionCreators/index';
import { useDispatch } from 'react-redux';
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

function ResetPassword() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const parameter = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    if (password === '' || confirmPassword === '') return;
    dispatch(
      resetPassword(
        { token: parameter.resetToken, password, confirmPassword },
        setLoading
      )
    );
  };
  return (
    <Paper className={classes.reset}>
      <h2>Reset password</h2>
      <form onSubmit={submitHandler} className={classes.reset__form}>
        <TextField
          classes={{ root: styles.inp }}
          label='Password'
          variant='outlined'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          classes={{ root: styles.inp }}
          label='Confirm password'
          variant='outlined'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;
