import './App.css';
import { Route, Switch } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Student from './containers/Student/Student';
import Teacher from './containers/Teacher/Teacher';
import Admin from './containers/Admin/Admin';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import { useSelector, useDispatch } from 'react-redux';
function App() {
  const globalState = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const closeSnackbar = () => {
    dispatch({ type: 'RESET_ERROR' });
  };
  return (
    <div className='App'>
      {/* for error */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        autoHideDuration={6000}
        open={globalState.open}
        onClose={closeSnackbar}
        message={
          <p style={{ fontSize: '1.6rem' }}>{globalState.errorMessage}</p>
        }
        action={<Button onClick={closeSnackbar}>close</Button>}
      />

      <Switch>
        <Route path='/student' component={Student} />
        <Route path='/teacher' component={Teacher} />
        <Route path='/admin' component={Admin} />
        <Route path='/' component={Auth} />
      </Switch>
    </div>
  );
}

export default App;
