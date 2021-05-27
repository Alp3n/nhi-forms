import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useFetch } from '../hooks/useFetch';
import { SEARCH_URL } from '../utils/consts';

import { Box, Grid, ResponsiveContext, Spinner, Tab, Tabs } from 'grommet';
import Layout from '../components/Layout';
import PatientCard from '../components/PatientCard';
import GoogleForm from '../components/GoogleForm';
import ActiveForm from '../components/ActiveForm';
import PatientList from '../components/PatientList';

const Dashboard = () => {
  const [response, setResponse] = useState({ response: 'nothing' });
  const { user } = useContext(AuthContext);
  const size = useContext(ResponsiveContext);
  const { status, data } = useFetch(SEARCH_URL + user.email, response);
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
                  <GoogleForm response={response} setResponse={setResponse} />
                </ActiveForm>
              </Box>
            </Tab>
            <Tab title='Wyniki'>
              <Box height='100%' overflow='auto'>
                <PatientList
                  resultCount={status === 'fetched' ? data.length : null}
                >
                  {status === 'fetched' ? (
                    data.map((item) => (
                      <PatientCard key={item['row_id']} item={item} />
                    ))
                  ) : (
                    <Spinner size='large' />
                  )}
                </PatientList>
              </Box>
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
            <GoogleForm response={response} setResponse={setResponse} />
          </ActiveForm>

          <PatientList resultCount={status === 'fetched' ? data.length : null}>
            {status === 'fetched' ? (
              data.map((item) => (
                <PatientCard key={item['row_id']} item={item} />
              ))
            ) : (
              <Spinner size='large' />
            )}
          </PatientList>
        </Grid>
      )}
    </Layout>
  );
};

export default Dashboard;
