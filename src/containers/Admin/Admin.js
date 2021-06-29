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
import Icon from './../../components/UI/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
import Avatar from '@material-ui/core/Avatar';

function Admin() {
  return (
    <div className={classes.admin}>
      <div className={classes.admin__sidebar}>
        <Sidebar />
      </div>
      <div className={classes.admin__main}>
        <Paper square elevation={2} className={classes.admin__main__header}>
          <Icon name='ham' style={{ width: '4rem', height: '4rem' }} />
          <div className={classes.admin__main__header__profile}>
            <Avatar src='https://blogs-images.forbes.com/danschawbel/files/2017/12/Dan-Schawbel_avatar_1512422077-400x400.jpg' />
            <span>Angelina</span>
          </div>
        </Paper>

        {/* Main content goes here */}
        <div style={{ padding: '2rem' }}>
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
    </div>
  );
}

export default Admin;
