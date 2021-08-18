import React, { Suspense } from 'react';
import './App.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import Auth from './containers/Auth/Auth';

// import { useDispatch } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AnimatePresence } from 'framer-motion';
const Admin = React.lazy(() => import('./containers/Admin/Admin'));
const Student = React.lazy(() => import('./containers/Student/Student'));
const Teacher = React.lazy(() => import('./containers/Teacher/Teacher'));

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
  },
});

function App() {
  const location = useLocation();
  // const globalState = useSelector((state) => ({
  //   error: state.error,
  //   user: state.user,
  // }));
  // const dispatch = useDispatch();
  // const closeSnackbar = () => {
  //   dispatch({ type: 'RESET_ERROR' });
  // };
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Suspense fallback={'loading...'}>
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.key}>
              <Route path='/student' component={Student} />
              <Route path='/teacher' component={Teacher} />
              <Route path='/admin' component={Admin} />
            </Switch>
          </AnimatePresence>
        </Suspense>

        <Route path='/auth' component={Auth} />

        <Route path='/' exact component={Auth} />
      </ThemeProvider>
    </div>
  );
}

export default App;
