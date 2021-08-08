import React, { useEffect } from 'react';
import classes from './Auth.module.scss';
import { Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import axios from '../../axios-instance/axiosInstance';
import { useDispatch } from 'react-redux';
import { LOGIN } from './../../store/actions/index';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ResetPassword from './ResetPassword/ResetPassword';
import { motion } from 'framer-motion';

const authVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'linear',
    },
  },
};
function Auth() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get('/api/v1/users/auto-login');
        const user = res.data.user;
        dispatch({ type: LOGIN, payload: user });
      } catch (err) {
        console.log(err.message);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className={classes.auth}
      variants={authVariant}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <Switch>
        <Route
          path='/auth/resetPassword/:resetToken'
          component={ResetPassword}
        />
        <Route path='/auth/forgotPassword' component={ForgotPassword} />
        <Route path='/' exact component={Login} />
      </Switch>
    </motion.div>
  );
}

export default Auth;
