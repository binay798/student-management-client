import './App.css';
import { Route, Switch } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Student from './containers/Student/Student';
import Teacher from './containers/Teacher/Teacher';
import Admin from './containers/Admin/Admin';

function App() {
  return (
    <div className='App'>
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
