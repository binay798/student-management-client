import React from 'react';
import classes from './Events.module.scss';
import { Paper, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import shortenText from '../../../utlis/shortenText';

const useStyles = makeStyles(() => {
  return {
    root: {
      width: '100%',
      display: 'block',
      marginBottom: '2rem',
      '& > *': {
        width: '100%',
        fontSize: '1.6rem ',
      },
      '& .MuiInputBase-root': {
        width: '100%',
      },
      '& .MuiOutlinedInput-input': {
        height: '15rem',
      },
    },
    btn: {
      textTransform: 'none',
      fontSize: '1.6rem',
      marginLeft: 'auto',
      display: 'block',
      width: '15rem',
    },
  };
});

function Events() {
  const styles = useStyles();
  return (
    <div className={classes.events}>
      <div className={classes.events__container}>
        <Paper className={classes.events__left}>
          <h2 className={classes.events__head}>Create events</h2>
          <form className={classes.events__form}>
            <TextField
              id='outlined-basic'
              label='Event topic'
              variant='outlined'
              className={classes.events__form__inp}
            />
            <TextField
              id='outlined-multiline-static'
              label='Message'
              multiline
              rows={4}
              className={styles.root}
              variant='outlined'
            />
            <Button variant='contained' className={styles.btn} color='primary'>
              Submit
            </Button>
          </form>
        </Paper>
        <Paper className={classes.events__right}>
          {/* heading */}
          <h2 className={classes.events__head} style={{ marginBottom: '0' }}>
            Recent events
          </h2>

          {/* container */}
          <div className={classes.events__right__container}>
            <div className={classes.events__item}>
              <h2>Holiday update</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                libero enim itaque.
              </p>
            </div>
            <div className={classes.events__item}>
              <h2>Holiday update</h2>
              <p>
                {shortenText(
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. temporibus enim? Culpa, expedita! Molestias ducimus atque corporis a amet, debitis perferendis officiis eum.'
                )}
              </p>
            </div>
            <div className={classes.events__item}>
              <h2>Holiday update</h2>
              <p>
                {shortenText(
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint libero enim itaque.'
                )}
              </p>
            </div>
            <div className={classes.events__item}>
              <h2>Holiday update</h2>
              <p>
                {shortenText(
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint libero enim itaque.'
                )}
              </p>
            </div>
            <div className={classes.events__item}>
              <h2>Holiday update</h2>
              <p>
                {shortenText(
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint libero enim itaque.'
                )}
              </p>
            </div>
            <div className={classes.events__item}>
              <h2>Holiday update</h2>
              <p>
                {shortenText(
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint libero enim itaque.'
                )}
              </p>
            </div>
            <div className={classes.events__item}>
              <h2>Holiday update</h2>
              <p>
                {shortenText(
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint libero enim itaque.'
                )}
              </p>
            </div>
          </div>

          {/* button */}
          <Button
            className={classes.events__right__btn}
            variant='contained'
            color='secondary'
          >
            Load more
          </Button>
        </Paper>
      </div>
    </div>
  );
}

export default Events;
