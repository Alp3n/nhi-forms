import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useFetch } from '../hooks/useFetch';
import { SEARCH_URL } from '../utils/consts';

import { Box, Grid, InfiniteScroll, Text } from 'grommet';
import Layout from '../components/Layout';
import PatientCard from '../components/PatientCard';
import GoogleForm from '../components/GoogleForm';

const Dashboard = () => {
  const [change, setChange] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const { status, data } = useFetch(SEARCH_URL + user.email, change);

  const handleChange = (id) => {
    setChange(id);
  };

  const handleLoading = (bool) => {
    setLoading(bool);
  };

  return (
    <Layout
      title='NHI Formularze'
      background='portrait-2'
      titleBackground='light-1'
    >
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
        <Box gridArea='form' background='light-1' elevation='small'>
          <Box
            background='light-2'
            pad='medium'
            justify='center'
            elevation='small'
          >
            <Text size='large'>Aktualny formularz</Text>
          </Box>

          <Box overflow='auto' height='100%' pad={{ vertical: 'small' }}>
            <GoogleForm handleChange={handleChange} />
          </Box>
        </Box>

        <Box gridArea='table' background='light-1' elevation='small'>
          <Box
            background='light-2'
            pad='medium'
            justify='center'
            elevation='small'
            style={{ zIndex: 3 }}
          >
            <Text size='large'>Wyniki pacjentów: {data.length}</Text>
          </Box>
          <Box overflow='auto' pad={{ vertical: 'medium' }}>
            <Grid pad={{ horizontal: 'medium' }} gap='small'>
              {status === 'fetched' ? (
                <InfiniteScroll items={data}>
                  {(item) => <PatientCard key={item['row_id']} item={item} />}
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
