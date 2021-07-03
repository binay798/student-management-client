import React from 'react';
import classes from './CreateGrade.module.scss';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Icon from './../../../../components/UI/Icon/Icon';
import { InputAdornment, Avatar, IconButton, Button } from '@material-ui/core';
import { imgUrl } from './../../Admin';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function CreateGrade() {
  const [teacher, setTeacher] = React.useState('John');
  return (
    <Paper className={classes.grade}>
      <h2 className={classes.grade__head}>Create a new grade</h2>

      <div className={classes.grade__form}>
        <div className={classes.grade__form__top}>
          <TextField
            label='Grade name'
            className={classes.grade__form__inp}
            variant='outlined'
          />
          <TextField
            label='Batch'
            type='number'
            className={classes.grade__form__inp}
            variant='outlined'
          />
          <TextField
            label='Grade total fee'
            type='number'
            className={classes.grade__form__inp}
            variant='outlined'
          />
        </div>

        {/* Add students and teachers */}
        <div className={classes.grade__form__add}>
          <div className={classes.grade__form__add__left}>
            <div className={classes.grade__form__add__search}>
              <TextField
                variant='outlined'
                label='search students'
                className={classes.grade__form__inp}
                style={{ maxWidth: '25rem' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon name='search' />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <ul>
              {Array(5)
                .fill()
                .map((item) => {
                  return (
                    <li>
                      <Avatar src={imgUrl} />
                      <p>John Doe</p>
                      <IconButton style={{ marginLeft: 'auto' }}>
                        <Icon name='trash' style={{ fill: 'coral' }} />
                      </IconButton>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={classes.grade__form__add__right}>
            <div className={classes.grade__form__add__search}>
              <TextField
                variant='outlined'
                label='search teachers'
                className={classes.grade__form__inp}
                style={{ maxWidth: '25rem' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon name='search' />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <ul>
              {Array(5)
                .fill()
                .map((item) => {
                  return (
                    <li>
                      <Avatar src={imgUrl} />
                      <p>John Doe</p>
                      <IconButton style={{ marginLeft: 'auto' }}>
                        <Icon name='trash' style={{ fill: 'coral' }} />
                      </IconButton>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        {/* Add subjects */}
        <div className={classes.grade__form__subjects}>
          <div>
            <TextField
              variant='outlined'
              className={classes.grade__form__inp}
              label='Add subjects'
            />
            <FormControl
              variant='outlined'
              className={classes.grade__form__inp}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Select teacher
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                label='Age'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'John'}>John</MenuItem>
                <MenuItem value={'Mosh'}>Mosh</MenuItem>
                <MenuItem value={'Stephane'}>Stephane</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant='contained'
              startIcon={
                <Icon
                  name='plus'
                  style={{ fill: 'white', width: '1.5rem', height: '1.5rem' }}
                />
              }
              color='primary'
            >
              Add
            </Button>
          </div>

          <ul className={classes.grade__form__subjects__items}>
            {Array(5)
              .fill()
              .map((item) => {
                return (
                  <li>
                    <p>Math</p>
                    <p>John doe</p>
                    <IconButton style={{ marginLeft: 'auto' }}>
                      <Icon name='trash' style={{ fill: 'coral' }} />
                    </IconButton>
                  </li>
                );
              })}
          </ul>
        </div>

        <Button
          variant='contained'
          color='primary'
          style={{ marginLeft: 'auto', display: 'block' }}
        >
          Submit
        </Button>
      </div>
    </Paper>
  );
}

export default CreateGrade;
