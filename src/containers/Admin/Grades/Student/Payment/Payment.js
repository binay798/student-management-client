import React, { useState } from 'react';
import classes from './Payment.module.scss';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import Icon from '../../../../../components/UI/Icon/Icon';
import initializeState from '../../../../../utlis/initializeState';
import { useSelector, useDispatch } from 'react-redux';

function Payment(props) {
  const [title, setTitle] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [createResultLoading, setCreateResultLoading] = useState(false);
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.result);
  const [getResultsLoading, setGetResultsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title !== '' && imgSrc !== '') {
      const resultData = {
        photoUrl: imgSrc,
        title,
        grade: parseInt(props.grade),
        batch: props.batch,
        userId: props.studentId,
      };
      // dispatch(createResult(resultData, setCreateResultLoading));
    } else {
      console.log('error');
    }
    initializeState([setTitle, setImgSrc]);
  };

  // delete result
  const deleteHandler = (id) => {
    dispatch();
    // deleteResult({ userId: props.studentId, resultId: id }, setDeleteLoading)
  };
  return (
    <div className={classes.payment}>
      <div className={classes.payment__container}>
        <div className={classes.payment__left}>
          <h2>All payments</h2>
        </div>
        <div className={classes.payment__right}>
          <h2>Create payments</h2>
          <form
            onSubmit={submitHandler}
            className={classes.payment__right__form}
          >
            {/* image preview*/}
            {imgSrc ? (
              <img src={imgSrc} className={classes.imgPreview} alt='preview' />
            ) : (
              <Icon
                name='image'
                style={{ width: '20rem', height: '20rem', margin: '0 auto' }}
              />
            )}

            <TextField
              label='Image url'
              className={classes.payment__right__form__inp}
              variant='outlined'
              value={imgSrc}
              onChange={(e) => setImgSrc(e.target.value)}
            />

            <TextField
              label='Title'
              className={classes.payment__right__form__inp}
              variant='outlined'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button
              variant='contained'
              type='submit'
              className={classes.btn}
              color='primary'
              disabled={createResultLoading}
            >
              {createResultLoading ? <CircularProgress /> : 'Submit'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
