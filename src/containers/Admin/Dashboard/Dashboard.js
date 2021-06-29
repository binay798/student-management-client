import React from 'react';
import classes from './Dashboard.module.scss';
import { Paper } from '@material-ui/core';
import Icon from '../../../components/UI/Icon/Icon';

function Dashboard() {
  return (
    <div className={classes.dashboard}>
      <div className={classes.dashboard__top}>
        <Paper className={classes.dashboard__top__item}>
          <Icon name='students' />
        </Paper>
        <Paper className={classes.dashboard__top__item}>
          <Icon name='teachers' />
        </Paper>
        <Paper className={classes.dashboard__top__item}>
          <Icon name='settings' />
        </Paper>
      </div>
    </div>
  );
}

export default Dashboard;
