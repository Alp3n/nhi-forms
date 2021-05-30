// import './App.css';

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';

import { Grommet } from 'grommet';
import './App.css';
import { lightTheme } from './myTheme';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AuthContextProvider from './context/authContext';
import ModalContextProvider from './context/modalContext';
import ProtectedRoute from './components/ProtectedRoute';
import PatientContextProvider from './context/patientContext';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './components/AlertTemplate';

const alertOptions = {
  position: positions.TOP_CENTER,
  timeout: 2000,
  offset: '30px',
  transition: transitions.SCALE,
};

function App() {
  return (
    <Grommet theme={lightTheme} full>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <AuthContextProvider>
          <ModalContextProvider>
            <PatientContextProvider>
              <Router>
                <Switch>
                  <Route path='/login' exact>
                    <Login />
                  </Route>
                  <ProtectedRoute path='/dashboard' exact>
                    <Dashboard />
                  </ProtectedRoute>
                  <Route path='/'>
                    <Redirect to='/login' />
                  </Route>
                </Switch>
              </Router>
            </PatientContextProvider>
          </ModalContextProvider>
        </AuthContextProvider>
      </AlertProvider>
    </Grommet>
  );
}

export default App;
