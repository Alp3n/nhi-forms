import React, { useState, useEffect } from 'react';

import { Box, Grid, InfiniteScroll, Text } from 'grommet';
import Layout from '../components/Layout';
import form from '../utils/form.json';
import PatientCard from '../components/PatientCard';
import { useFetch } from '../hooks/useFetch';
import { SHEET_URL } from '../utils/consts';
import GoogleForm from '../components/GoogleForm';

const Dashboard = () => {
  const [formState, setFormState] = useState();

  const { status, data } = useFetch(SHEET_URL, false);
  console.log(status, data);

  return (
    <Layout
      title='NHI Formularze'
      background='portrait-2'
      titleBackground='light-1'
    >
      <Grid
        rows={['large']}
        columns={['35%', '60%']}
        areas={[
          { name: 'form', start: [0, 0], end: [1, 0] },
          { name: 'table', start: [1, 0], end: [2, 0] },
        ]}
        gap='medium'
        margin='medium'
      >
        <Box gridArea='form' background='light-1' elevation='small'>
          <Box
            background='light-2'
            margin={{ bottom: 'medium' }}
            pad='medium'
            justify='center'
          >
            <Text size='large'>Aktualny formularz</Text>
          </Box>

          <Box overflow='auto' height='100%'>
            <GoogleForm />
          </Box>
        </Box>

        <Box gridArea='table' background='light-1' elevation='small'>
          <Box
            background='light-2'
            margin={{ bottom: 'medium' }}
            pad='medium'
            justify='center'
          >
            <Text size='large'>Wyniki pacjentów</Text>
          </Box>
          <Box overflow='auto' pad={{ vertical: 'small' }}>
            <Grid pad={{ horizontal: 'medium' }} gap='small'>
              {status === 'fetched' ? (
                <InfiniteScroll items={data.data}>
                  {(item) => (
                    <PatientCard
                      key={item['row_id']}
                      item={item}
                      name={item['1. Imię i nazwisko:']}
                      age={item['2. Wiek pacjenta:']}
                      checkboxValues={[
                        item['Pierwsze'],
                        item['Drugie'],
                        item['Trzecie'],
                        item['Czwarte'],
                        item['Piąte'],
                      ]}
                    />
                  )}
                </InfiniteScroll>
              ) : null}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
