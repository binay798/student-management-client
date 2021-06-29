import React from 'react';
import classes from './Icon.module.scss';
import sprites from './../../../assets/icons/sprites.svg';
function Icon(props) {
  return (
    <svg className={classes.icon} style={props.style}>
      <use href={`${sprites}#${props.name}`} />
    </svg>
  );
}

export default Icon;
