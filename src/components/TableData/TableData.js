import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import classes from './TableData.module.scss';
import { IconButton, Avatar } from '@material-ui/core';
import Icon from './../UI/Icon/Icon';
import { imgUrl } from './../../containers/Admin/Admin';

function TableData(props) {
  console.log(props);
  return (
    <React.Fragment>
      <TableCell className={classes.table} align='left'>
        {`${props.firstname} ${props.lastname}`}
      </TableCell>
      <TableCell className={classes.table} align='right'>
        <Avatar
          alt='Cindy Baker'
          src={props.profilePic || imgUrl}
          style={{ marginLeft: 'auto' }}
        />
      </TableCell>
      <TableCell className={classes.table} align='right'>
        {props.grade}
      </TableCell>
      <TableCell className={classes.table} align='right'>
        {props.mobile || 'n/a'}
      </TableCell>
      <TableCell className={classes.table} align='right'>
        {new Date(props.batch).getFullYear() || 'n/a'}
      </TableCell>
      <TableCell className={classes.table} align='right'>
        <div>
          <IconButton onClick={() => props.selectUser(props)}>
            <Icon name='eye' style={{ fill: '#444' }} />
          </IconButton>

          <IconButton>
            <Icon name='edit' style={{ fill: '#3f51b5' }} />
          </IconButton>
        </div>
      </TableCell>
    </React.Fragment>
  );
}

export default TableData;
