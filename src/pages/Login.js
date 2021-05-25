import { useState, useContext } from 'react';
import { ANKIETA } from '../utils/consts';
import {
  Box,
  Button,
  Spinner,
  Text,
  ResponsiveContext,
  Grid,
  DropButton,
} from 'grommet';

import { Redirect, useHistory } from 'react-router';
import Layout from '../components/Layout';
import { AuthContext } from '../context/authContext';
import EntryForm from '../components/EntryForm';
import styled from 'styled-components';

const defaultLoginData = {
  email: '',
  password: '',
};

/* 
MOBILE
------
FORM
ABOUT
PRINT


MEDIUM
------
FORM ABOUT
PRINT ABOUT


*/

const areas = {
  small: [
    { name: 'form', start: [0, 0], end: [1, 0] },
    { name: 'about', start: [0, 1], end: [1, 1] },
    { name: 'print', start: [0, 2], end: [1, 2] },
  ],
  medium: [
    { name: 'form', start: [0, 0], end: [0, 1] },
    { name: 'about', start: [1, 0], end: [1, 1] },
    { name: 'print', start: [0, 1], end: [0, 1] },
  ],
  large: [
    { name: 'form', start: [0, 0], end: [0, 1] },
    { name: 'about', start: [1, 0], end: [1, 1] },
    { name: 'print', start: [0, 1], end: [0, 1] },
  ],
};

const ResponsiveGrid = ({ children, areas, ...props }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Grid areas={areas[size]} {...props}>
      {children}
    </Grid>
  );
};

const Login = () => {
  const [loginData, setLoginData] = useState(defaultLoginData);
  const [register, setRegister] = useState(false);
  const size = useContext(ResponsiveContext);

  const { user, loading, error, login, signOut } = useContext(AuthContext);

  let history = useHistory();

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  if (loading) {
    return <Spinner size='large' />;
  }

  return (
    <Layout
      center
      background='portrait-2'
      title='NHI Formularze'
      titleBackground='light-1'
      login
    >
      <ResponsiveGrid
        rows={
          size === 'small'
            ? ['auto', 'auto', 'auto']
            : size === 'medium'
            ? ['auto', 'auto']
            : size === 'large'
            ? ['auto', 'auto']
            : size === 'xlarge'
            ? ['auto']
            : null
        }
        columns={
          size === 'small'
            ? ['auto', 'auto']
            : size === 'medium'
            ? ['30%', '60%']
            : size === 'large'
            ? ['30%', '60%']
            : size === 'xlarge'
            ? ['auto']
            : null
        }
        margin='small'
        areas={areas}
        gap='small'
        // fill='vertical'
        justifyContent='center'
        alignContent='center'
        // alignContent='center'
      >
        <Box gridArea='form' alignSelf='start'>
          <EntryForm
            fill='horizontal'
            register={register}
            login={login}
            signOut={signOut}
            loading={loading}
            error={error}
            loginData={loginData}
            setLoginData={setLoginData}
            setRegister={setRegister}
            history={history}
          />
        </Box>
        <Box
          pad='small'
          background='light-1'
          elevation='small'
          gridArea='print'
          // align='center'
          alignSelf='start'
        >
          <LinkWrapper href='https://docs.google.com/forms/d/e/1FAIpQLSeabZ7p0goqPk7CJubW7yzSESQC2FxtX9JAp2FSESGpeCTV-Q/viewform'>
            <PrintButton label='Wydrukuj ankietę' />
          </LinkWrapper>
          <Text margin='small'>
            Aby wydrukować ankietę kliknij w przycisk powyżej, a następnie na
            kalwiaturze CTRL+P, lub prawy przycisk myszy i wybierz opcję
            "Drukuj"
          </Text>
        </Box>
        {size === 'small' ? (
          <Box
            pad='small'
            background='light-1'
            elevation='small'
            gridArea='about'
            alignSelf='end'
          >
            <DropButton
              label='Więcej o ankiecie'
              dropAlign={{ top: 'bottom' }}
              dropContent={
                <>
                  {ANKIETA.map((el) => (
                    <Text key={el} margin={{ bottom: 'small' }} size='16px'>
                      {el}
                    </Text>
                  ))}
                </>
              }
            />
          </Box>
        ) : (
          <Box
            height='85vh'
            overflow='auto'
            background='light-1'
            pad='small'
            elevation='small'
            gridArea='about'
            alignSelf='start'
          >
            {ANKIETA.map((el) => (
              <Text key={el} margin={{ bottom: 'small' }} size='16px'>
                {el}
              </Text>
            ))}
          </Box>
        )}
      </ResponsiveGrid>
    </Layout>
  );
};

export default Login;

const LinkWrapper = styled.a`
  display: block;
  width: 100%;
`;

const PrintButton = styled(Button)`
  width: 100%;
  background-color: #f8f8f8;
  transition: all 0.2s ease-in-out;
  :hover {
    background-color: #1c94b4;
    color: white;
    /* transform: scale(1.02); */
  }
`;
