import React from 'react';
import classes from './Sidebar.module.scss';
import Icon from '../UI/Icon/Icon';
import { NavLink } from 'react-router-dom';

function Sidebar(props) {
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
          <Icon name='dashboard' className={classes.icon} />
          <span className={classes.item}>Dashboard</span>
        </NavLink>
        <NavLink
          to='/admin/students'
          className={classes.sidebar__item}
          activeClassName={classes.active}
        >
          <Icon name='students' className={classes.icon} />
          <span className={classes.item}>Students</span>
        </NavLink>
        <NavLink
          to='/admin/images'
          className={classes.sidebar__item}
          activeClassName={classes.active}
        >
          <Icon name='image' className={classes.icon} />
          <span className={classes.item}>Images</span>
        </NavLink>
        <NavLink
          to='/admin/teachers'
          className={classes.sidebar__item}
          activeClassName={classes.active}
        >
          <Icon name='teachers' className={classes.icon} />
          <span className={classes.item}>Teachers</span>
        </NavLink>
        <NavLink
          to='/admin/createUser'
          className={classes.sidebar__item}
          activeClassName={classes.active}
        >
          <Icon name='user' className={classes.icon} />
          <span className={classes.item}>Create user</span>
        </NavLink>
        <NavLink
          to='/admin/events'
          className={classes.sidebar__item}
          activeClassName={classes.active}
        >
          <Icon name='events' className={classes.icon} />
          <span className={classes.item}>Events</span>
        </NavLink>

        <NavLink
          to='/admin/grades'
          className={classes.sidebar__item}
          activeClassName={classes.active}
        >
          <Icon name='grades' className={classes.icon} />
          <span className={classes.item}>Grades</span>
        </NavLink>
        <NavLink
          to='/admin/settings'
          className={classes.sidebar__item}
          activeClassName={classes.active}
        >
          <Icon name='settings' className={classes.icon} />
          <span className={classes.item}>Settings</span>
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;
