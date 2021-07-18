import React from 'react';
import classes from './Payments.module.scss';
import { Button } from '@material-ui/core';
function Payments() {
  return (
    <div className={classes.payments}>
      {/* Heading and create payments */}
      <div className={classes.payments__create}>
        <h3 className={classes.payments__heading}>Payments</h3>
        <Button variant='outlined' color='primary'>
          Create payment
        </Button>
      </div>

      {/* Main content */}
      <div className={classes.payments__container}>
        <ul className={classes.payments__tableHead}>
          <li>Photo</li>
          <li>Title</li>
          <li>Description</li>
          <li>Amount</li>
          <li>Actions</li>
        </ul>
        <ul className={classes.payments__tableBody}></ul>
      </div>
    </div>
  );
}

export default Payments;
