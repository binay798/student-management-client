import React, { useState, useEffect } from 'react';
import classes from './Result.module.scss';
import { Button, TextField, Paper, Modal } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '../../../../../components/UI/Icon/Icon';
import {
  createResult,
  getResults,
  deleteResult,
} from '../../../../../store/actionCreators/index';

function Result(props) {
  // const [title, setTitle] = useState('');
  // const [imgSrc, setImgSrc] = useState('');
  const [createResultLoading, setCreateResultLoading] = useState(false);
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.result);
  const [getResultsLoading, setGetResultsLoading] = useState(false);
  const [showCreateResultModal, setShowCreateResultModal] = useState(false);

  useEffect(() => {
    // empty result at first

    dispatch(
      getResults(
        {
          id: props.studentId,
          batch: props.batch,
          grade: props.grade,
        },
        setGetResultsLoading
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = (e, data) => {
    e.preventDefault();
    console.log(data, 'submit handler');
    if (data.title !== '' && data.imgSrc !== '') {
      const resultData = {
        photoUrl: data.imgSrc,
        title: data.title,
        grade: parseInt(props.grade),
        batch: props.batch,
        userId: props.studentId,
      };
      dispatch(createResult(resultData, setCreateResultLoading));
    } else {
      console.log('error');
    }
    setShowCreateResultModal(false);
  };

  // delete result
  const deleteHandler = (id) => {
    dispatch(deleteResult({ userId: props.studentId, resultId: id }));
  };

  return (
    <div className={classes.result}>
      {/* Create result modal */}
      <CreateResultModal
        open={showCreateResultModal}
        onClose={() => setShowCreateResultModal(false)}
        onSubmit={submitHandler}
        loading={createResultLoading}
      />
      <div className={classes.result__create}>
        <h3 className={classes.result__heading}>Results</h3>
        <Button
          onClick={() => setShowCreateResultModal(true)}
          variant='outlined'
          color='primary'
        >
          Create result
        </Button>
      </div>
      <div className={classes.result__container}>
        <ul className={classes.result__tableHead}>
          <li>Photo</li>
          <li>Name</li>
          <li>Actions</li>
        </ul>
        <ul className={classes.result__tableBody}>
          {/* loading */}
          {getResultsLoading ? 'Loading' : null}

          {globalState.results &&
            globalState.results.map((item) => {
              return (
                <li key={item._id} className={classes.result__tableBody__item}>
                  <img
                    className={classes.result__tableBody__img}
                    src={item.photoUrl}
                    alt={item.title}
                  />
                  <p>{item.title}</p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href={item.photoUrl} target='blank'>
                      <Button variant='contained' color='primary'>
                        View
                      </Button>
                    </a>
                    <Button
                      variant='contained'
                      onClick={() => deleteHandler(item._id)}
                      color='secondary'
                    >
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

function CreateResultModal(props) {
  const [imgSrc, setImgSrc] = useState('');
  const [title, setTitle] = useState('');
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Paper className={classes.createResultModal}>
        <h2>Create result</h2>

        {imgSrc ? (
          <img className={classes.preview} src={imgSrc} alt='preview' />
        ) : (
          <Icon className={classes.preview} name='image' />
        )}

        {/* Create result form */}
        <form
          onSubmit={(e) => props.onSubmit(e, { title, imgSrc })}
          className={classes.createResultModal__form}
        >
          <TextField
            className={classes.createResultModal__form__inp}
            variant='outlined'
            label='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            className={classes.createResultModal__form__inp}
            variant='outlined'
            label='Image url'
            value={imgSrc}
            onChange={(e) => setImgSrc(e.target.value)}
          />
          <Button
            disabled={props.loading}
            className={classes.btn}
            variant='contained'
            type='submit'
            color='primary'
          >
            {props.loading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Paper>
    </Modal>
  );
}
export default Result;
