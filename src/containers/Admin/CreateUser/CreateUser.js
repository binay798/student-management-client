import React, { useState } from 'react';
import classes from './CreateUser.module.scss';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

function CreateUser() {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Paper className={classes.user}>
      <h2 className={classes.user__head}>Create new user</h2>
      <form action='#' className={classes.user__form}>
        <div className={classes.user__form__top}>
          <TextField
            label='Firstname'
            className={classes.user__inp}
            variant='outlined'
          />
          <TextField
            label='Middlename'
            className={classes.user__inp}
            variant='outlined'
          />
          <TextField
            label='Lastname'
            className={classes.user__inp}
            variant='outlined'
          />
        </div>
        <div className={classes.user__form__bottom}>
          <TextField
            label='Email address'
            type='email'
            className={classes.user__inp}
            variant='outlined'
          />
          <TextField
            label='Mobile number'
            type='number'
            className={classes.user__inp}
            variant='outlined'
          />
        </div>
        <div className={classes.user__form__bottom}>
          <FormControl variant='outlined' className={classes.user__inp}>
            <InputLabel id='demo-simple-select-outlined-label'>Age</InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              value={age}
              onChange={handleChange}
              label='Age'
            >
              <MenuItem value='' style={{ fontSize: '1.4rem' }}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10} style={{ fontSize: '1.4rem' }}>
                Ten
              </MenuItem>
              <MenuItem value={20} style={{ fontSize: '1.4rem' }}>
                Twenty
              </MenuItem>
              <MenuItem value={30} style={{ fontSize: '1.4rem' }}>
                Thirty
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </form>
    </Paper>
  );
}

export default CreateUser;
