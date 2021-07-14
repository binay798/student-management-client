import React, { useState, useEffect } from 'react';
import classes from './Result.module.scss';
import { Button, ButtonGroup, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '../../../../../components/UI/Icon/Icon';
import {
  createResult,
  getResults,
} from '../../../../../store/actionCreators/index';

const img =
  'https://see.results.news/wp-content/uploads/2019/08/SEE-Result-With-Marksheet-.png';
function Result(props) {
  const [title, setTitle] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [createResultLoading, setCreateResultLoading] = useState(false);
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.result);

  useEffect(() => {
    if (globalState.results) return;
    dispatch(
      getResults({
        id: props.studentId,
        batch: props.batch,
        grade: props.grade,
      })
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
  };
  return (
    <div className={classes.result}>
      <div className={classes.result__left}>
        <h2>All Results</h2>
        <ul>
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
                      <Button>Edit</Button>
                      <Button color='secondary'>Delete</Button>
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
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Result;
