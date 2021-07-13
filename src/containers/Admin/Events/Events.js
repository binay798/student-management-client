import React, {useState, useEffect} from 'react';
import classes from './Events.module.scss';
import { Paper, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import shortenText from '../../../utlis/shortenText';
import axiosInstance from '../../../axios-instance/axiosInstance.js';
import { CircularProgress } from '@material-ui/core';
import Moment from 'react-moment';

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
  const [events, setEvents] = useState([]); //list to store events
  const [loading, setLoading] = useState(true); //used to show circular progress when data is being fetched

  useEffect(() => {
    getEvents(); //get events in db as soon as the component mounts.
  }, []);

  function getEvents(){ //api call to retrieve events.
    axiosInstance.get('api/v1/events')
      .then(function(response){
	console.log(response.data.events);
	setEvents(response.data.events);
	setLoading(false);
      })
      .catch(function(error){
	console.log(error);
      });
  }

  function handleSubmit(e){
    e.preventDefault();
    var _name = e.target[0].value;
    var _description = e.target[2].value;

    //api call to store the field values.
    axiosInstance.post('/api/v1/events', {
        name: _name,
        description: _description 
      })
      .then(function(response){
        console.log(response);
	setEvents(events => events.concat({name: _name, description: _description, createdAt: Date.now()}));
      })
      .catch(function(error){
        console.log(error);
      })
  }

  return (
    <div className={classes.events}>
      <div className={classes.events__container}>
        <Paper className={classes.events__left}>
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
        <Paper className={classes.events__right}>
          {/* heading */}
          <h2 className={classes.events__head} style={{ marginBottom: '0' }}>
            Recent events
          </h2>
          {loading &&
	    <CircularProgress/>
	  }
          {!loading &&
	    <div className={classes.events__right__container}>
              {events.map((eve) =>
		<div className={classes.events__item}>
		  <h2>{eve.name}</h2>
		  <p>
		    {eve.description}
		  </p>
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
