import React from 'react';
import classes from './Student.module.scss';
import Paper from '@material-ui/core/Paper';
import { imgUrl } from './../../Admin';
import Button from '@material-ui/core/Button';
import Icon from './../../../../components/UI/Icon/Icon';

function Student() {
  return (
    <Paper className={classes.student}>
      <div className={classes.student__container}>
        <div className={classes.student__img}>
          <img src={imgUrl} alt='user' />
        </div>
        <div className={classes.student__desc}>
          <h2 className={classes.student__head}>Student details</h2>

          <div className={classes.student__desc__container}>
            <div className={classes.student__desc__content}>
              <p>Fullname:</p>
              <p>Binay shrestha</p>
            </div>
            <div className={classes.student__desc__content}>
              <p>Email address:</p>
              <p>binay@gmail.com</p>
            </div>
            <div className={classes.student__desc__content}>
              <p>Roll no.:</p>
              <p>3</p>
            </div>
            <div className={classes.student__desc__content}>
              <p>Mobile:</p>
              <p>9856478523</p>
            </div>
            <div className={classes.student__desc__content}>
              <p>Role:</p>
              <p>Student</p>
            </div>
            <div className={classes.student__desc__content}>
              <p>Grade:</p>
              <p>8</p>
            </div>
            <div className={classes.student__desc__content}>
              <p>Batch:</p>
              <p>2019</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results and Payments*/}
      <div className={classes.resAndPay}>
        <div className={classes.resAndPay__left}>
          <Results />
        </div>
        <div className={classes.resAndPay__right}>
          <Payments />
        </div>
      </div>
    </Paper>
  );
}

function Results() {
  return (
    <div className={classes.results}>
      <div className={classes.results__head}>
        <h2>Results</h2>
        <Button
          variant='contained'
          startIcon={
            <Icon
              name='plus'
              style={{ fill: 'white', width: '1rem', height: '1rem' }}
            />
          }
          color='secondary'
          className={classes.btn}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

function Payments() {
  return (
    <div className={classes.payments}>
      <div className={classes.payments__head}>
        <h2>Payments</h2>
        <Button
          variant='contained'
          startIcon={
            <Icon
              name='plus'
              style={{ fill: 'white', width: '1rem', height: '1rem' }}
            />
          }
          color='secondary'
          className={classes.btn}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

export default Student;
