import React, { createContext } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseObj } from '../utils/firebase';
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, loading, error] = useAuthState(firebaseObj.auth());

  const login = (email, password, history) => {
    firebaseObj.auth().signInWithEmailAndPassword(email, password);
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
