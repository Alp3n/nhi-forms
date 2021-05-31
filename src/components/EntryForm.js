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
import { useAlert } from 'react-alert';
import { Hide, View } from 'grommet-icons';

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
  ...props
}) => {
  const [registerData, setRegisterData] = useState(defaultRegisterData);
  const [reveal, setReveal] = useState(false);
  const [reset, setReset] = useState(false);
  const [email, setEmail] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(
    firebaseObj.auth() /* ,{sendEmailVerification : true} */
  );
  const myAlert = useAlert();

  const handleRegister = (email, password, displayName) => {
    createUserWithEmailAndPassword(email, password)
      .then(() => {
        let user = firebaseObj.auth().currentUser;
        user.updateProfile({
          displayName: displayName,
        });
        firebaseObj.auth().signOut();
      })
      .then(() => myAlert.success('Zarejestrowano pomyślnie'))
      .then(() => setRegister(false))
      .catch((error) => {
        myAlert.error('Wystąpił błąd przy rejestracji');
        console.log(error);
      });
  };

  const handlePasswordReset = (email) => {
    const auth = firebaseObj.auth();

    auth
      .sendPasswordResetEmail(email)
      .then(() => myAlert.success('Wysłano email do zresetowania hasła'))
      .catch((err) => myAlert.error('Wystąpił błąd przy resetowaniu hasła'));
  };

  return (
    <Card background='light-1' round='none' alignSelf='center' {...props}>
      <CardBody pad='small' gap='small'>
        <Text size='large' weight='bold' margin='xsmall'>
          {register ? 'Zarejestruj się' : 'Zaloguj się'}
        </Text>
        {loading ? (
          <Spinner message='Trwa logowanie' />
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
                  type='text'
                  minLength={6}
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
              label={register ? 'Hasło (min 8 znaków)' : 'Hasło'}
              htmlFor='password-input-id'
              required
            >
              <Box direction='row'>
                <TextInput
                  plain
                  id='password-input-id'
                  name='password'
                  placeholder={
                    register
                      ? 'Wpisz hasło min 8 znaków...'
                      : 'Wpisz swoje hasło...'
                  }
                  type={reveal ? 'text' : 'password'}
                  minLength={8}
                  focusIndicator={false}
                />
                {reveal ? (
                  <Button icon={<View />} onClick={() => setReveal(false)} />
                ) : (
                  <Button icon={<Hide />} onClick={() => setReveal(true)} />
                )}
              </Box>
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
                <Box gap='small'>
                  <Button
                    label='Zapomniałeś hasło? Kliknij tutaj aby je zresetować.'
                    plain
                    color='primary'
                    style={{ fontSize: '16px' }}
                    onClick={() => setReset((prev) => !prev)}
                  />
                  {reset ? (
                    <Box gap='small'>
                      <TextInput
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder='Twój email...'
                        type='email'
                      />
                      <Button
                        label='Wyślij email resetujący hasło'
                        onClick={() => handlePasswordReset(email)}
                      />
                    </Box>
                  ) : null}
                  <Button
                    label='Nie masz konta? Kliknij tutaj aby się zarejestrować.'
                    plain
                    color='primary'
                    style={{ fontSize: '16px' }}
                    onClick={() => setRegister(true)}
                  />
                </Box>
              )}
            </Box>
          </Form>
        )}
      </CardBody>
    </Card>
  );
};
export default EntryForm;
