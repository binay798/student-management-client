import React, { useState } from 'react';
import classes from './Settings.module.scss';
import Icon from '../../../components/UI/Icon/Icon';
import { TextField, Button, Paper, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { updateAdmin } from '../../../store/actionCreators/index';

const useStyles = makeStyles(() => {
  return {
    btn: {
      fontSize: '1.4rem',
      width: '100%',
    },
    inp: {
      width: '100%',
      '& > *': {
        fontSize: '1.4rem',
      },
    },
  };
});

function Settings() {
  const globalState = useSelector((state) => state.user);
  return (
    <Paper className={classes.settings}>
      <h2>Settings</h2>
      <div className={classes.settings__container}>
        <div className={classes.settings__left}>
          <div className={classes.settings__left__desc}>
            <p>
              <strong>Firstname:</strong>
            </p>
            <p>{globalState.user.firstname}</p>
          </div>
          <div className={classes.settings__left__desc}>
            <p>
              <strong>Lastname:</strong>
            </p>
            <p>{globalState.user.lastname}</p>
          </div>
          <div className={classes.settings__left__desc}>
            <p>
              <strong>Email address:</strong>
            </p>
            <p style={{ textTransform: 'none' }}>{globalState.user.email}</p>
          </div>
          <div className={classes.settings__left__desc}>
            <p>
              <strong>Role:</strong>
            </p>
            <p>{globalState.user.role}</p>
          </div>
          <div className={classes.settings__left__desc}>
            <p>
              <strong>Mobile:</strong>
            </p>
            <p>{globalState.user.mobile}</p>
          </div>
          <div className={classes.settings__left__desc}>
            <p>
              <strong>Gender:</strong>
            </p>
            <p>Male</p>
          </div>
          <EditModal user={globalState.user} />
        </div>
        <div className={classes.settings__right}>
          {/* {!globalState.user.profilePic && (
            <Icon name='user' className={classes.icon} />
          )}
          {globalState.user &&
            globalState.user.profilePic(
              <img
                src={globalState.user.profilePic}
                className={classes.icon}
                alt='profile'
                style={{ width: '30rem', height: '30rem' }}
              />
            )} */}
          {!globalState.user.profilePic && (
            <Icon name='user' className={classes.icon} />
          )}
          {globalState.user.profilePic && (
            <img
              src={globalState.user.profilePic}
              className={classes.icon}
              alt='profile'
              style={{ width: '30rem', height: '30rem' }}
            />
          )}
          {console.log(globalState.user.profilePic)}
        </div>
      </div>
    </Paper>
  );
}

function EditModal(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState(props.user.firstname || '');
  const [lastname, setLastname] = useState(props.user.lastname || '');
  const [email, setEmail] = useState(props.user.email || '');
  const [mobile, setMobile] = useState(props.user.mobile || '');
  const [imgSrc, setImgSrc] = useState(props.user.profilePic || '');
  const [loading, setLoading] = useState(false);
  const styles = useStyles();

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      firstname,
      lastname,
      email,
      mobile,
      profilePic: imgSrc,
      id: props.user._id,
    };
    dispatch(updateAdmin(data, setLoading));
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant='contained'
        color='secondary'
        classes={{ root: styles.btn }}
        style={{ width: 'max-content' }}
      >
        Edit details
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper className={classes.modal}>
          <form onSubmit={submitHandler} className={classes.edit}>
            <h3>Edit details</h3>
            <TextField
              variant='outlined'
              classes={{ root: styles.inp }}
              label='Firstname'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <TextField
              variant='outlined'
              classes={{ root: styles.inp }}
              label='Lastname'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <TextField
              variant='outlined'
              classes={{ root: styles.inp }}
              label='Email address'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant='outlined'
              classes={{ root: styles.inp }}
              label='Mobile'
              type='number'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <TextField
              variant='outlined'
              classes={{ root: styles.inp }}
              label='Image src'
              type='text'
              value={imgSrc}
              onChange={(e) => setImgSrc(e.target.value)}
            />
            <Button
              classes={{ root: styles.btn }}
              variant='contained'
              color='secondary'
              type='submit'
              disabled={loading}
            >
              {loading ? 'Please wait...' : 'Edit'}
            </Button>
          </form>
        </Paper>
      </Modal>
    </div>
  );
}

export default Settings;
