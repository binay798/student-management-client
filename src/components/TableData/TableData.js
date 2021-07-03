import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import classes from './TableData.module.scss';
import { IconButton, Avatar } from '@material-ui/core';
import Icon from './../UI/Icon/Icon';
import { imgUrl } from './../../containers/Admin/Admin';
import { Link } from 'react-router-dom';

function TableData(props) {
  return (
    <React.Fragment>
      <TableCell className={classes.table} align='left'>
        {props.name}
      </TableCell>
      <TableCell className={classes.table} align='right'>
        <Avatar alt='Cindy Baker' src={imgUrl} style={{ marginLeft: 'auto' }} />
      </TableCell>
      <TableCell className={classes.table} align='right'>
        {props.grade}
      </TableCell>
      <TableCell className={classes.table} align='right'>
        {props.mobile}
      </TableCell>
      <TableCell className={classes.table} align='right'>
        {props.batch}
      </TableCell>
      <TableCell className={classes.table} align='right'>
        <div>
          <Link to={`/admin/${props.type}/dsaf`}>
            <IconButton>
              <Icon name='eye' style={{ fill: '#444' }} />
            </IconButton>
          </Link>

          <IconButton>
            <Icon name='edit' style={{ fill: '#3f51b5' }} />
          </IconButton>
        </div>
      </TableCell>
    </React.Fragment>
  );
}

export default TableData;
