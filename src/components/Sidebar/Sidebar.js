import React from 'react';
import classes from './Sidebar.module.scss';
import Icon from '../UI/Icon/Icon';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className={classes.sidebar}>
      <h2 className={classes.sidebar__head}>
        <span>Admin</span>
      </h2>

      <ul className={classes.sidebar__container}>
        <NavLink
          to='/admin'
          exact
          className={classes.sidebar__item}
          activeClassName={classes.active}
        >
          <Icon name='dashboard' />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to='/admin/students'
          className={classes.sidebar__item}
          activeClassName={classes.active}
        >
          <Icon name='students' />
          <span>Students</span>
        </NavLink>
        <NavLink
          to='/admin/images'
          className={classes.sidebar__item}
          activeClassName={classes.active}
        >
          <Icon name='image' />
          <span>Images</span>
        </NavLink>
        <NavLink
          to='/admin/teachers'
          className={classes.sidebar__item}
          activeClassName={classes.active}
        >
          <Icon name='teachers' />
          <span>Teachers</span>
        </NavLink>
        <NavLink
          to='/admin/createUser'
          className={classes.sidebar__item}
          activeClassName={classes.active}
        >
          <Icon name='user' />
          <span>Create user</span>
        </NavLink>
        <NavLink
          to='/admin/events'
          className={classes.sidebar__item}
          activeClassName={classes.active}
        >
          <Icon name='events' />
          <span>Events</span>
        </NavLink>

        <NavLink
          to='/admin/grades'
          className={classes.sidebar__item}
          activeClassName={classes.active}
        >
          <Icon name='grades' />
          <span>Grades</span>
        </NavLink>
        <NavLink
          to='/admin/settings'
          className={classes.sidebar__item}
          activeClassName={classes.active}
        >
          <Icon name='settings' />
          <span>Settings</span>
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;
