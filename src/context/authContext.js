import React, { createContext } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseObj } from '../utils/firebase';
import { useAlert } from 'react-alert';
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, loading, error] = useAuthState(firebaseObj.auth());
  const myAlert = useAlert();

  const login = (email, password, history) => {
    firebaseObj
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        return error.code === 'auth/user-not-found'
          ? myAlert.error('Nie ma takiego użytkownika')
          : myAlert.error('Wystąpił błąd, sprawdź login i hasło');
      });
    history.replace('/dashboard');
  };
  const logout = (history) => {
    firebaseObj.auth().signOut();
    history.replace('/login');
  };

  const signOut = () => {
    firebaseObj.auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, signOut }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
