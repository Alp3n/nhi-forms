import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useFetch } from '../hooks/useFetch';
import { SEARCH_URL } from '../utils/consts';

import {
  Box,
  Grid,
  InfiniteScroll,
  ResponsiveContext,
  Tab,
  Tabs,
} from 'grommet';
import Layout from '../components/Layout';
import PatientCard from '../components/PatientCard';
import GoogleForm from '../components/GoogleForm';
import ActiveForm from '../components/ActiveForm';
import PatientList from '../components/PatientList';

const Dashboard = () => {
  const [change, setChange] = useState();
  // const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const size = useContext(ResponsiveContext);
  const { status, data } = useFetch(SEARCH_URL + user.email, change);

  const handleChange = (id) => {
    setChange(id);
  };

  // const handleLoading = (bool) => {
  //   setLoading(bool);
  // };

  return (
    <Layout
      title='NHI Formularze'
      background='portrait-2'
      titleBackground='light-1'
    >
      {size === 'small' ? (
        <Box>
          <Tabs gridArea='navigation'>
            <Tab title='Ankieta'>
              <Box height='100%' overflow='auto'>
                <ActiveForm>
                  <GoogleForm handleChange={handleChange} />
                </ActiveForm>
              </Box>
            </Tab>
            <Tab title='Wyniki'>
              <PatientList resultCount={data.length}>
                {status === 'fetched' ? (
                  <InfiniteScroll items={data}>
                    {(item) => <PatientCard key={item['row_id']} item={item} />}
                  </InfiniteScroll>
                ) : null}
              </PatientList>
            </Tab>
          </Tabs>
        </Box>
      ) : (
        <Grid
          rows={['85vh']}
          columns={['35%', '60%']}
          areas={[
            { name: 'form', start: [0, 0], end: [1, 0] },
            { name: 'table', start: [1, 0], end: [2, 0] },
          ]}
          gap='medium'
          margin='medium'
        >
          <ActiveForm>
            <GoogleForm handleChange={handleChange} />
          </ActiveForm>

          <PatientList resultCount={data.length}>
            {status === 'fetched' ? (
              <InfiniteScroll items={data}>
                {(item) => <PatientCard key={item['row_id']} item={item} />}
              </InfiniteScroll>
            ) : null}
          </PatientList>
        </Grid>
      )}
    </Layout>
  );
};

export default Dashboard;
