import { useEffect, useState } from 'react';
// import { HEADERS } from '../utils/consts';

export const STATUS_TYPES = {
  idle: 'idle',
  fetching: 'fetching',
  fetched: 'fetched',
  empty: 'empty',
  error: 'error',
};

export const useFetch = (url, dependency) => {
  const [status, setStatus] = useState(STATUS_TYPES.idle); //idle, fetching, fetched, empty, error
  const [data, setData] = useState([]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (!url) {
      return;
    }

    if (dependency === null) {
      // EMPTY DEPENDENCY = EXPECT NULL;
      return setStatus(STATUS_TYPES.empty);
    }

    const fetchData = async () => {
      setStatus(STATUS_TYPES.fetching);

      try {
        const response = await fetch(url, {
          // credentials: 'include',
          // headers: HEADERS,
          // mode: 'cors',
        });
        const data = await response.json();
        setStatus('fetched');
        setData(data);
      } catch (err) {
        setStatus(STATUS_TYPES.error);
      }
    };

    delay(10000).then(() => fetchData());

    return () => {
      setStatus(STATUS_TYPES.idle);
      setData([]);
    };
  }, [url, dependency]);

  return { status, data };
};
