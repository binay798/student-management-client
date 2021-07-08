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
import { Menu, MenuItem, Button } from '@material-ui/core';
import CreateUser from './CreateUser/CreateUser';
import User from './User/User';
import Grade from './Grades/Grade/Grade';
import CreateGrade from './Grades/CreateGrade/CreateGrade';
import Student from './Grades/Student/Student';
import { useHistory } from 'react-router';
import Images from './Images/Images';

export const imgUrl =
  'https://blogs-images.forbes.com/danschawbel/files/2017/12/Dan-Schawbel_avatar_1512422077-400x400.jpg';

function Admin() {
  return (
    <div className={classes.admin}>
      <div className={classes.admin__sidebar}>
        <Sidebar />
      </div>
      <div className={classes.admin__main}>
        <Header />
        {/* Main content goes here */}
        <div
          style={{
            padding: '2rem',
            height: 'calc(100vh - 7rem)',
            overflowY: 'scroll',
          }}
        >
          <Switch>
            <Route path='/admin/events' component={Events} />
            <Route path='/admin/grades/:id/:studentId' component={Student} />

            <Route path='/admin/grades/:id' component={Grade} />
            <Route path='/admin/grades' component={Grades} />
            <Route path='/admin/createGrade' component={CreateGrade} />
            <Route path='/admin/payments' component={Payments} />
            <Route path='/admin/settings' component={Settings} />
            <Route path='/admin/students' component={Students} />
            <Route path='/admin/teachers' component={Teachers} />
            <Route path='/admin/createUser' component={CreateUser} />
            <Route path='/admin/user/:id' component={User} />
            <Route path='/admin/images' component={Images} />

            <Route path='/' component={Dashboard} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const history = useHistory();
  return (
    <Paper square elevation={2} className={classes.admin__main__header}>
      <Icon name='ham' style={{ width: '4rem', height: '4rem' }} />

      <Button
        variant='outlined'
        onClick={() => history.goBack()}
        style={{ marginRight: 'auto' }}
      >
        Go back
      </Button>

      <Button
        onClick={handleClick}
        className={classes.admin__main__header__profile}
      >
        <Avatar src={imgUrl} />
        <span>Mark</span>
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={classes.admin__menuItem} onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem className={classes.admin__menuItem} onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem className={classes.admin__menuItem} onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </Paper>
  );
}

export default Admin;
