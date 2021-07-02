import { Paper } from '@material-ui/core';
import React from 'react';
import classes from './User.module.scss';
import { imgUrl } from './../Admin';

function User() {
  return (
    <Paper className={classes.user}>
      <div className={classes.user__container}>
        <div className={classes.user__img}>
          <img src={imgUrl} alt='user' />
        </div>
        <div className={classes.user__desc}>
          <h2 className={classes.user__head}>User details</h2>

          <div className={classes.user__desc__container}>
            <div className={classes.user__desc__content}>
              <p>Fullname:</p>
              <p>Binay shrestha</p>
            </div>
            <div className={classes.user__desc__content}>
              <p>Email address:</p>
              <p>binay@gmail.com</p>
            </div>
            <div className={classes.user__desc__content}>
              <p>Mobile:</p>
              <p>9856478523</p>
            </div>
            <div className={classes.user__desc__content}>
              <p>Role:</p>
              <p>Student</p>
            </div>
            <div className={classes.user__desc__content}>
              <p>Grade:</p>
              <p>8</p>
            </div>
            <div className={classes.user__desc__content}>
              <p>Batch:</p>
              <p>2019</p>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default User;
