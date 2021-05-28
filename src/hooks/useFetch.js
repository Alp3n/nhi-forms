import { useEffect, useState } from 'react';
// import { HEADERS } from '../utils/consts';

export const STATUS_TYPES = {
  idle: 'idle',
  fetching: 'fetching',
  fetched: 'fetched',
  empty: 'empty',
  error: 'error',
};

const defaultData = [
  {
    row_id: 0,
  },
];

export const useFetch = (url, dependency) => {
  const [status, setStatus] = useState(STATUS_TYPES.idle); //idle, fetching, fetched, empty, error
  const [data, setData] = useState(defaultData);
  console.log(dependency);
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
        if (data.length > 0) {

          setData(data);
        } else {
          setData(defaultData);
        }
        setStatus(STATUS_TYPES.fetched);
      } catch (err) {

        setStatus(STATUS_TYPES.error);
      }
    };

    delay(5000).then(() => fetchData());

    return () => {
      setData(defaultData);
      setStatus(STATUS_TYPES.idle);
    };
  }, [url, dependency]);

  return { status, data };
};
