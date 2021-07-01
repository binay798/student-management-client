import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import classes from './TableData.module.scss';
import { IconButton } from '@material-ui/core';
import Icon from './../UI/Icon/Icon';

function TableData(props) {
  return (
    <React.Fragment>
      <TableCell className={classes.table} align='left'>
        {props.name}
      </TableCell>
      <TableCell className={classes.table} align='right'>
        {props.photo}
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
          <IconButton>
            <Icon name='eye' style={{ fill: '#3f51b5' }} />
          </IconButton>
          <IconButton>
            <Icon name='trash' style={{ fill: 'coral' }} />
          </IconButton>
        </div>
      </TableCell>
    </React.Fragment>
  );
}

export default TableData;
