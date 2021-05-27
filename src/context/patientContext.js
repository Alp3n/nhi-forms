import React, { createContext, useState } from 'react';

export const STATUS_TYPES = {
  idle: 'idle',
  fetching: 'fetching',
  fetched: 'fetched',
  empty: 'empty',
  error: 'error',
};

export const PatientContext = createContext();

const PatientContextProvider = (props) => {
  const [patients, setPatients] = useState('Brak wyników');
  const [status, setStatus] = useState(STATUS_TYPES.idle);

  const fetchData = async (url) => {
    setStatus(STATUS_TYPES.fetching);
    try {
      const response = await fetch(url, {});
      const data = await response.json();

      setPatients(data);
      setStatus('fetched');
    } catch (err) {
      setPatients('Wystąpił problem');
      setStatus(STATUS_TYPES.error);
    }
  };

  const getPatients = (url) => {
    if (!url) {
      return;
    }
    fetchData(url)
  };

  return (
    <PatientContext.Provider
      value={{ status, patients, getPatients }}
    >
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;
