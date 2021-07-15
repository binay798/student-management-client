import React, { useState, useEffect } from 'react';
import classes from './Payment.module.scss';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import Icon from '../../../../../components/UI/Icon/Icon';
import initializeState from '../../../../../utlis/initializeState';
import { useSelector, useDispatch } from 'react-redux';
import {
  createPayment,
  getStudentPayments,
} from './../../../../../store/actionCreators/index';

function Payment(props) {
  const [title, setTitle] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [createResultLoading, setCreateResultLoading] = useState(false);
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.payment);
  // const [getResultsLoading, setGetResultsLoading] = useState(false);
  // const [deleteLoading, setDeleteLoading] = useState(false);

  // get payments
  useEffect(() => {
    dispatch(getStudentPayments(props.studentId));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title !== '' && imgSrc !== '' && description !== '' && amount !== 0) {
      const paymentData = {
        title,
        image: imgSrc,
        grade: props.grade,
        batch: props.batch,
        paymentAmount: amount,
        createdAt: Date.now(),
        paymentDescription: description,
        userId: props.studentId,
      };

      dispatch(createPayment(paymentData));
    } else {
      console.log('error');
    }
    // initializeState([setTitle, setImgSrc]);
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

          {globalState.studentPayments.length !== 0 &&
            globalState.studentPayments.map((item) => {
              return (
                <div key={item._id}>
                  <div className={classes.payment__left__head}>
                    <h2>{item.title}</h2>
                    <p>{item.paymentDescription}</p>
                  </div>
                  <img
                    className={classes.payment__left__img}
                    src={item.image}
                    alt='payment'
                  />
                </div>
              );
            })}
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
            <TextField
              label='Amount'
              type='number'
              className={classes.payment__right__form__inp}
              variant='outlined'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
              id='outlined-multiline-static'
              label='Description'
              multiline
              className={classes.payment__right__form__inp}
              rows={8}
              variant='outlined'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
