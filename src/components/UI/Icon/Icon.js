import React from 'react';
import classes from './Icon.module.scss';

function Icon(props) {
  return (
    <svg className={classes.icon} style={props.style}>
      <use href='' />
    </svg>
  );
}

export default Icon;
