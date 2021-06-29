import React from 'react';
import classes from './Auth.module.scss';
import { Switch, Route } from 'react-router-dom';
import Login from './Login/Login';

function Auth() {
  return (
    <div className={classes.auth}>
      <Switch>
        <Route path='/' component={Login} />
      </Switch>
    </div>
  );
}

export default Auth;
