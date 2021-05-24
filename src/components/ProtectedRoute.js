import { useContext } from 'react';
import { Route, Redirect } from 'react-router';
import { AuthContext } from '../context/authContext';

const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
