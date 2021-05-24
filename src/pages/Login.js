import { useState, useContext } from 'react';
import { ANKIETA } from '../utils/consts';
import { Box, Button, Spinner, Text } from 'grommet';

import { Redirect, useHistory } from 'react-router';
import Layout from '../components/Layout';
import { AuthContext } from '../context/authContext';
import EntryForm from '../components/EntryForm';
import styled from 'styled-components';

const defaultLoginData = {
  email: '',
  password: '',
};

const Login = () => {
  const [loginData, setLoginData] = useState(defaultLoginData);
  const [register, setRegister] = useState(false);
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
      <Box width='100%' direction='row' justify='around'>
        <Box direction='column' gap='small'>
          <EntryForm
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
          <Box
            width='medium'
            pad='small'
            margin='small'
            background='light-1'
            elevation='small'
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
        </Box>

        <Box
          width='40%'
          overflow='auto'
          background='light-1'
          pad='small'
          margin='small'
          elevation='small'
        >
          {ANKIETA.map((el) => (
            <Text key={el} margin={{ bottom: 'small' }} size='16px'>
              {el}
            </Text>
          ))}
          <Text></Text>
        </Box>
      </Box>
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
