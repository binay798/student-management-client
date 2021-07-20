import React, { useState, useEffect } from 'react';
import classes from './Payment.module.scss';
import { TextField, Button, Paper, Modal } from '@material-ui/core';
import Icon from '../../../../../components/UI/Icon/Icon';
import { useSelector, useDispatch } from 'react-redux';
import {
  createPayment,
  getStudentPayments,
} from './../../../../../store/actionCreators/index';

function Payment(props) {
  const [openCreatePayment, setOpenCreatePayment] = useState(false);
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.payment);

  // get payments
  useEffect(() => {
    dispatch(
      getStudentPayments({
        id: props.studentId,
        batch: props.batch,
        grade: props.grade,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.payment}>
      {/* Create payment modal */}
      <CreatePaymentModal
        open={openCreatePayment}
        onClose={() => setOpenCreatePayment(false)}
        batch={props.batch}
        grade={props.grade}
        studentId={props.studentId}
      />
      <div className={classes.payment__create}>
        <h3 className={classes.payment__heading}>Payments</h3>
        <Button
          onClick={() => setOpenCreatePayment(true)}
          variant='outlined'
          color='primary'
        >
          Create payment
        </Button>
      </div>

      <div className={classes.payment__container}>
        <ul className={classes.payment__tableHead}>
          <li>Photo</li>
          <li>Title</li>
          <li>Description</li>
          <li>Amount</li>
          <li>Actions</li>
        </ul>

        {/* main content */}
        <ul className={classes.payment__tableBody}>
          {globalState.studentPayments &&
            globalState.studentPayments.map((item) => {
              return (
                <li key={item._id} className={classes.payment__tableBody__item}>
                  <img
                    className={classes.payment__tableBody__img}
                    src={item.image}
                    alt={item.title}
                  />
                  <p>{item.title}</p>
                  <p>{item.paymentDescription}</p>
                  <p>Rs {item.paymentAmount.toLocaleString('en-US')}</p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href={item.image} target='blank'>
                      <Button variant='contained' color='primary'>
                        View
                      </Button>
                    </a>
                    <Button variant='contained' color='secondary'>
                      Delete
                    </Button>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

function CreatePaymentModal(props) {
  const [imgSrc, setImgSrc] = useState('');
  const [title, setTitle] = useState('');
  const [paymentDescription, setPaymentDescription] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      imgSrc !== '' &&
      title !== '' &&
      paymentDescription !== '' &&
      paymentAmount !== ''
    ) {
      dispatch(
        createPayment(
          {
            title,
            paymentDescription,
            paymentAmount,
            image: imgSrc,
            batch: props.batch,
            grade: props.grade,
            userId: props.studentId,
            createdAt: Date.now(),
          },
          setLoading
        )
      );
    }
  };
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Paper className={classes.createPaymentModal}>
        <h2>Create Payment</h2>

        {imgSrc ? (
          <img className={classes.preview} src={imgSrc} alt='preview' />
        ) : (
          <Icon className={classes.preview} name='image' />
        )}

        {/* Create payment form */}
        <form
          onSubmit={submitHandler}
          className={classes.createPaymentModal__form}
        >
          <TextField
            className={classes.createPaymentModal__form__inp}
            variant='outlined'
            label='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            className={classes.createPaymentModal__form__inp}
            variant='outlined'
            label='Image url'
            value={imgSrc}
            onChange={(e) => setImgSrc(e.target.value)}
          />
          <TextField
            label='Description'
            className={classes.createPaymentModal__form__inp}
            multiline
            rows={6}
            variant='outlined'
            value={paymentDescription}
            onChange={(e) => setPaymentDescription(e.target.value)}
          />
          <TextField
            className={classes.createPaymentModal__form__inp}
            variant='outlined'
            label='Amount'
            type='number'
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
          <Button
            disabled={loading}
            className={classes.btn}
            variant='contained'
            type='submit'
            color='primary'
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Paper>
    </Modal>
  );
}

export default Payment;
