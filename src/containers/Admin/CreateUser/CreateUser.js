import React, { useState } from 'react';
import classes from './CreateUser.module.scss';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from '@material-ui/core';
import Icon from './../../../components/UI/Icon/Icon';

const profileImgUrl =
  'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg';

function CreateUser() {
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  return (
    <Paper className={classes.user}>
      <h2 className={classes.user__head}>Create new user</h2>
      <div className={classes.user__container}>
        <div className={classes.user__img}>
          <img src={profileImgUrl} alt='profile' />
          <Button
            variant='contained'
            color='secondary'
            className={classes.user__form__btn}
            startIcon={<Icon name='image' style={{ fill: '#eee' }} />}
          >
            Upload
          </Button>
        </div>

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
              <InputLabel id='demo-simple-select-outlined-label'>
                Age
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={age}
                onChange={(e) => setAge(e.target.value)}
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

            <FormControl variant='outlined' className={classes.user__inp}>
              <InputLabel id='demo-simple-select-outlined-label'>
                Role
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label='Role'
              >
                <MenuItem value='' style={{ fontSize: '1.4rem' }}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'student'} style={{ fontSize: '1.4rem' }}>
                  Student
                </MenuItem>
                <MenuItem value={'teacher'} style={{ fontSize: '1.4rem' }}>
                  Teacher
                </MenuItem>
                <MenuItem value={'admin'} style={{ fontSize: '1.4rem' }}>
                  Admin
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className={classes.user__form__bottom}>
            <TextField
              label='Password'
              type='password'
              className={classes.user__inp}
              variant='outlined'
            />
            <FormControl variant='outlined' className={classes.user__inp}>
              <InputLabel htmlFor='outlined-adornment-password'>
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowPassword(!showPassword)}
                      // onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? (
                        <Icon name='visibilityOn' />
                      ) : (
                        <Icon name='visibilityOff' />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </div>

          <div className={classes.user__form__bottom}>
            <FormControl component='fieldset' className={classes.user__inp}>
              <FormLabel component='legend' style={{ fontSize: '1.4rem' }}>
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-label='position'
                name='position'
                defaultValue='top'
              >
                <FormControlLabel
                  value='male'
                  control={<Radio color='primary' />}
                  label='Male'
                  labelPlacement='start'
                />
                <FormControlLabel
                  value='female'
                  control={<Radio color='primary' />}
                  label='Female'
                  labelPlacement='start'
                />
                <FormControlLabel
                  value='other'
                  control={<Radio color='primary' />}
                  label='Other'
                  labelPlacement='start'
                />
              </RadioGroup>
            </FormControl>
          </div>
          <Button
            variant='contained'
            className={classes.user__form__btn}
            color='primary'
            style={{ width: '20rem' }}
          >
            Create user
          </Button>
        </form>
      </div>
    </Paper>
  );
}

export default CreateUser;
