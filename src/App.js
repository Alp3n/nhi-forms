// import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Grommet } from 'grommet';
import { lightTheme } from './myTheme';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Grommet theme={lightTheme}>
      <Router>
        <Switch>
          <Route path='/login' exact>
            <Login />
          </Route>
          <Route path='/dashboard' exact>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </Grommet>
  );
}

export default App;
