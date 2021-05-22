import {
  Box,
  Form,
  FormField,
  Text,
  Button,
  TextInput,
  Card,
  CardBody,
} from 'grommet';
import { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import styled from 'styled-components';
import Layout from '../components/Layout';

const defaultLoginData = {
  email: '',
  password: '',
};

const Login = () => {
  const [loginData, setLoginData] = useState(defaultLoginData);
  const history = useHistory();
  const handleSubmit = () => {
    // <Redirect to='/dashboard' />;
    history.push('/dashboard');
  };

  return (
    <Layout
      center
      background='portrait-2'
      title='NHI Formularze'
      titleBackground='light-1'
    >
      <Card height='medium' width='medium' background='light-1' round='none'>
        <CardBody pad='small' gap='small'>
          <Text size='large' weight='bold' margin='xsmall'>
            Zaloguj się
          </Text>
          <Form
            value={loginData}
            onChange={(nextValue) => setLoginData(nextValue)}
            onSubmit={
              ({ loginData }) => handleSubmit()
              /* TODO Firebase auth */
            }
            messages={{ required: 'Wymagany...' }}
          >
            <FormField
              name='email'
              label='Twój email'
              htmlFor='email-input-id'
              required
            >
              <TextInput
                id='email-input-id'
                name='email'
                placeholder='Wpisz swój email...'
              />
            </FormField>
            <FormField
              name='password'
              label='Twoje hasło'
              htmlFor='password-input-id'
              required
            >
              <TextInput
                id='password-input-id'
                name='password'
                placeholder='Wpisz swoje hasło...'
                type='password'
              />
            </FormField>
            <Box gap='medium'>
              <Button label='Zaloguj' type='submit' primary size='large' />
              <Button
                label='Nie masz konta? Kliknij tutaj aby się zarejestrować.'
                plain
                size='small'
                color='primary'
                style={{ fontSize: '16px' }}
              />
            </Box>
          </Form>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Login;
