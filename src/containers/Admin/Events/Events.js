import React, {useState, useEffect} from 'react';
import classes from './Events.module.scss';
import { Paper, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import shortenText from '../../../utlis/shortenText';
import axiosInstance from '../../../axios-instance/axiosInstance.js';
import { CircularProgress } from '@material-ui/core';
import Moment from 'react-moment';
import * as actionCreators from './../../../store/actionCreators/index';
import { useSelector, useDispatch } from 'react-redux';

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
  const globalState = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); //used to show circular progress when data is being fetched

  useEffect(() => {
    if(globalState.events == null){
      dispatch(actionCreators.getEvents(setLoading));
    }
  }, [dispatch, globalState]);

  function handleSubmit(e){
    e.preventDefault();

    var _name = e.target[0].value;
    var _description = e.target[2].value;

    dispatch(actionCreators.addEvent({name: _name, description: _description}, setLoading));

  }

  return (
    <div className={classes.events}>
      <div className={classes.events__container}>
        <div className={classes.events__left}>
          <Paper className={classes.events__top}>
            <h2> test </h2>
          </Paper>
          <Paper className={classes.events__bottom}>
            <h2 className={classes.events__head}>Create events</h2>
            <form className={classes.events__form} onSubmit={handleSubmit}>
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
              <Button type="submit" variant='contained' className={styles.btn} color='primary'>
                Submit
              </Button>
            </form>
          </Paper>
        </div>
        <Paper className={classes.events__right}>
          {/* heading */}
          <h2 className={classes.events__head} style={{ marginBottom: '0' }}>
            Recent events
          </h2>
          {loading &&
	    <CircularProgress/>
	  }
          {globalState.events &&
	    <div className={classes.events__right__container}>
              {globalState.events.map((eve) =>
		<div className={classes.events__item}>
		  <h2>{eve.name}</h2>
		  {eve.description.length > 60 
		    ? <p>{shortenText(eve.description)}</p>
		    : <p>{eve.description}</p>
		  }
		  <i><span className={classes.events__moment}><Moment fromNow>{eve.createdAt}</Moment></span></i>
		</div>
	      )}
	    </div>
	  }
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
