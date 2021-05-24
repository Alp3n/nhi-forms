import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { firebaseObj } from '../utils/firebase';
import {
  Box,
  Button,
  Card,
  CardBody,
  Form,
  FormField,
  TextInput,
  Text,
  Spinner,
} from 'grommet';

const defaultRegisterData = {
  name: '',
  email: '',
  password: '',
};

const EntryForm = ({
  login,
  signOut,
  loading,
  error,
  loginData,
  setLoginData,
  setRegister,
  history,
  register,
}) => {
  const [registerData, setRegisterData] = useState(defaultRegisterData);
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(
    firebaseObj.auth() /* ,{sendEmailVerification : true} */
  );

  const handleRegister = (email, password, displayName) => {
    createUserWithEmailAndPassword(email, password)
      .then(() => {
        let user = firebaseObj.auth().currentUser;
        user.updateProfile({
          displayName: displayName,
        });
        firebaseObj.auth().signOut();
      })
      .then(alert('Zarejestrowano pomyślnie'))
      .then(setRegister(false))
      .catch((error) => console.log(error));
  };

  return (
    <Card
      height={register ? '450px' : 'medium'}
      width='medium'
      background='light-1'
      round='none'
      margin='small'
      alignSelf='center'
    >
      <CardBody pad='small' gap='small'>
        <Text size='large' weight='bold' margin='xsmall'>
          {register ? 'Zarejestruj się' : 'Zaloguj się'}
        </Text>
        {loading ? (
          <Spinner />
        ) : (
          <Form
            value={register ? registerData : loginData}
            onChange={(nextValue) =>
              register ? setRegisterData(nextValue) : setLoginData(nextValue)
            }
            onSubmit={() =>
              register
                ? handleRegister(
                    registerData.email,
                    registerData.password,
                    registerData.name
                  )
                : login(loginData.email, loginData.password, history)
            }
            messages={{ required: 'Wymagany...' }}
          >
            {register ? (
              <FormField
                name='name'
                label='Imię i nazwisko'
                htmlFor='name-input-id'
                required
              >
                <TextInput
                  id='name-input-id'
                  name='name'
                  placeholder='Wpisz swoje imię i nazwisko...'
                />
              </FormField>
            ) : null}
            <FormField
              name='email'
              label='Email'
              htmlFor='email-input-id'
              required
            >
              <TextInput
                id='email-input-id'
                type='email'
                name='email'
                placeholder='Wpisz swój email...'
              />
            </FormField>
            <FormField
              name='password'
              label='Hasło'
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
              {register ? (
                <Button
                  label='Zarejestruj'
                  type='submit'
                  primary
                  size='medium'
                />
              ) : (
                <Button label='Zaloguj' type='submit' primary size='medium' />
              )}
              {error ? <Text>Hey</Text> : null}

              {register ? (
                <Button
                  label='Wróć do logowania'
                  plain
                  color='primary'
                  style={{ fontSize: '16px' }}
                  onClick={() => setRegister(false)}
                />
              ) : (
                <Button
                  label='Nie masz konta? Kliknij tutaj aby się zarejestrować.'
                  plain
                  color='primary'
                  style={{ fontSize: '16px' }}
                  onClick={() => setRegister(true)}
                />
              )}
            </Box>
          </Form>
        )}
      </CardBody>
    </Card>
  );
};
export default EntryForm;
