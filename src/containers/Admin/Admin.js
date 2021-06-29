import React from 'react';
import classes from './Admin.module.scss';
import { Paper } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Events from './Events/Events';
import Grades from './Grades/Grades';
import Payments from './Payments/Payments';
import Settings from './Settings/Settings';
import Students from './Students/Students';
import Teachers from './Teachers/Teachers';

function Admin() {
  return (
    <div className={classes.admin}>
      <div className={classes.admin__sidebar}>Sidebar</div>
      <div className={classes.admin__main}>
        <Paper square elevation={2} className={classes.admin__main__header}>
          Header
        </Paper>

        {/* Main content goes here */}
        <Switch>
          <Route path='/admin/events' component={Events} />
          <Route path='/admin/grades' component={Grades} />
          <Route path='/admin/payments' component={Payments} />
          <Route path='/admin/settings' component={Settings} />
          <Route path='/admin/students' component={Students} />
          <Route path='/admin/teachers' component={Teachers} />
          <Route path='/' component={Dashboard} />
        </Switch>
      </div>
    </div>
  );
}

export default Admin;
