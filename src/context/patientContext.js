import React, { createContext, useState } from 'react';

export const STATUS = {
  idle: 'idle',
  fetching: 'fetching',
  fetched: 'fetched',
  error: 'error',
};

export const PatientContext = createContext();

const PatientContextProvider = (props) => {
  const [patients, setPatients] = useState('Brak wyników');
  const [status, setStatus] = useState(STATUS.idle);

  const addToPatients = (data) => {
    setPatients(data);
  };

  const fetchData = async (url) => {
    setStatus(STATUS.fetching);
    try {
      const response = await fetch(url, {});
      const data = await response.json();

      setPatients(data);
      setStatus('fetched');
    } catch (err) {
      setPatients('Wystąpił problem');
      setStatus(STATUS.error);
    }
  };

  return (
    <PatientContext.Provider
      value={{ status, patients, addToPatients, fetchData }}
    >
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;
