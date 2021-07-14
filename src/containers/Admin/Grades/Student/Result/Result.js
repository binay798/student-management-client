import React, { useState, useEffect } from 'react';
import classes from './Result.module.scss';
import {
  Button,
  ButtonGroup,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '../../../../../components/UI/Icon/Icon';
import {
  createResult,
  getResults,
  deleteResult,
} from '../../../../../store/actionCreators/index';
import initializeState from '../../../../../utlis/initializeState';

function Result(props) {
  const [title, setTitle] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [createResultLoading, setCreateResultLoading] = useState(false);
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.result);
  const [getResultsLoading, setGetResultsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
  }, []);

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
      dispatch(createResult(resultData, setCreateResultLoading));
    } else {
      console.log('error');
    }
    initializeState([setTitle, setImgSrc]);
  };

  // delete result
  const deleteHandler = (id) => {
    dispatch(
      deleteResult({ userId: props.studentId, resultId: id }, setDeleteLoading)
    );
  };
  return (
    <div className={classes.result}>
      <div className={classes.result__left}>
        <h2>All Results</h2>
        <ul>
          {/* loading */}
          {getResultsLoading ? <CircularProgress /> : null}
          {globalState.results &&
            globalState.results.map((item, id) => {
              return (
                <li key={id}>
                  <div className={classes.result__left__head}>
                    <h3>{item.title}</h3>

                    <ButtonGroup
                      variant='contained'
                      color='primary'
                      aria-label='contained primary button group'
                    >
                      <Button
                        onClick={() => deleteHandler(item._id)}
                        color='secondary'
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? 'Deleting...' : 'Delete'}
                      </Button>
                    </ButtonGroup>
                  </div>

                  <div>
                    <img src={item.photoUrl} alt='marksheet' />
                  </div>
                </li>
              );
            })}
        </ul>
      </div>

      <div className={classes.result__right}>
        <h2>Create result</h2>
        <form onSubmit={submitHandler} className={classes.result__right__form}>
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
            className={classes.result__right__form__inp}
            variant='outlined'
            value={imgSrc}
            onChange={(e) => setImgSrc(e.target.value)}
          />

          <TextField
            label='Title'
            className={classes.result__right__form__inp}
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
  );
}

export default Result;
