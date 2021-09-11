import { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import React from 'react';
import classes from './User.module.scss';
import { imgUrl } from './../Admin';
import { Button, Modal, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { updateUser, getUser } from './../../../store/actionCreators/index';
import { connect, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Progress from '../../../components/UI/ProgressBar/ProgressBar';

function User(props) {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const location = useLocation();
  const userId = location.pathname.split('/')[3];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // get selected user
    dispatch(getUser(userId, setLoading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!props.user.selectedUser) {
    return <Progress loading={loading} />;
  }

  return (
    <Paper className={classes.user}>
      {/* Edit user modal goes here */}
      <EditUserModal
        open={showEditModal}
        {...props.user.selectedUser}
        onClose={() => setShowEditModal(false)}
        userId={userId}
        updateUser={props.updateUser}
      />
      <div className={classes.user__container}>
        <div className={classes.user__img}>
          <img src={props.user.selectedUser.profilePic || imgUrl} alt='user' />
        </div>
        <div className={classes.user__desc}>
          <h2 className={classes.user__head}>User details</h2>

          <div className={classes.user__desc__container}>
            <div className={classes.user__desc__content}>
              <p>Fullname:</p>
              <p
                style={{ textTransform: 'capitalize' }}
              >{`${props.user.selectedUser.firstname} ${props.user.selectedUser.lastname}`}</p>
            </div>
            <div className={classes.user__desc__content}>
              <p>Email address:</p>
              <p>{props.user.selectedUser.email}</p>
            </div>
            <div className={classes.user__desc__content}>
              <p>Mobile:</p>
              <p>{props.user.selectedUser.mobile || 'n/a'}</p>
            </div>
            <div className={classes.user__desc__content}>
              <p>Role:</p>
              <p>{props.user.selectedUser.role}</p>
            </div>
            <div className={classes.user__desc__content}>
              <p>Grade:</p>
              <p>{props.user.selectedUser.grade || 'n/a'}</p>
            </div>
            <div className={classes.user__desc__content}>
              <p>Batch:</p>
              <p>
                {new Date(props.user.selectedUser.batch).getFullYear() || 'n/a'}
              </p>
            </div>
            {/* Edit button */}
            <Button
              variant='contained'
              color='secondary'
              className={classes.btn}
              style={{ marginTop: '2rem' }}
              onClick={() => setShowEditModal(true)}
            >
              Edit details
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
}

// Edit user modal
function EditUserModal(props) {
  // const [role, setRole] = useState('');
  const [gender, setGender] = useState(props.gender || '');
  const [firstname, setFirstname] = useState(props.firstname || '');
  const [lastname, setLastname] = useState(props.lastname || '');
  const [email, setEmail] = useState(props.email || '');
  const [grade, setGrade] = useState(props.grade || '');
  const [batch, setBatch] = useState(new Date(props.batch).getFullYear() || '');
  const [mobile, setMobile] = useState(props.mobile || '');
  const [imgUrl, setImgUrl] = useState(props.profilePic || '');
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    props.updateUser(
      {
        firstname,
        lastname,
        email,
        gender,
        grade,
        batch,
        mobile,
        profilePic: imgUrl,
      },
      props.userId,
      setLoading
    );
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Paper className={classes.modal}>
        <h2 className={classes.modal__head}>Edit user details</h2>
        <form onSubmit={submitHandler} className={classes.modal__form}>
          <div className={classes.modal__form__top}>
            <TextField
              label='Firstname'
              className={classes.modal__form__inp}
              variant='outlined'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <TextField
              label='Middlename'
              className={classes.modal__form__inp}
              variant='outlined'
              value=''
            />
            <TextField
              label='Lastname'
              className={classes.modal__form__inp}
              variant='outlined'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className={classes.modal__form__top}>
            <TextField
              label='Grade'
              className={classes.modal__form__inp}
              variant='outlined'
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
            <TextField
              label='Batch'
              type='number'
              className={classes.modal__form__inp}
              variant='outlined'
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
            />
          </div>

          <div className={classes.modal__form__top}>
            <TextField
              label='Email'
              type='email'
              className={classes.modal__form__inp}
              variant='outlined'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label='Mobile'
              type='number'
              className={classes.modal__form__inp}
              variant='outlined'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <FormControl
              variant='outlined'
              className={classes.modal__form__inp}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Gender
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label='Gender'
                className={classes.modal__form__inp}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
                <MenuItem value={'other'}>other</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.modal__form__img}>
            {/* <div>
              <img src={imgUrl} alt='profile' />
            </div>
            <Button
              startIcon={<Icon name='image' style={{ fill: 'white' }} />}
              variant='contained'
              color='primary'
              className={classes.btn}
            >
              Upload
            </Button> */}
            <TextField
              label='Image Url'
              type='text'
              className={classes.modal__form__inp}
              variant='outlined'
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </div>
          <Button
            style={{ marginLeft: 'auto', display: 'block' }}
            variant='contained'
            color='primary'
            type='submit'
            className={classes.btn}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Edit'}
          </Button>
        </form>
      </Paper>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (data, id, setLoading) =>
      dispatch(updateUser(data, id, setLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
