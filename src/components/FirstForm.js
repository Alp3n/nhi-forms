import {
  Box,
  Button,
  CheckBoxGroup,
  Form,
  FormField,
  RadioButtonGroup,
  TextInput,
} from 'grommet';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { SHEET_URL } from '../utils/consts';
import { useAlert } from 'react-alert';

const defaultValue = {
  createdAt: '',
  email: '',
  name: '',
  1: '',
  2: '',
  3: '',
  4: '',
  4.1: '',
  5: '',
  6: '',
  7: '',
  8: '',
  8.1: '',
  8.2: '',
  9: '',
  9.1: '',
  10: '',
  10.1: '',
  11: '',
  11.1: '',
  12: '',
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const FirstForm = ({ response, setResponse }) => {
  const [value, setValue] = useState(defaultValue);
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');
  const { user } = useContext(AuthContext);
  const myAlert = useAlert();

  useEffect(() => {
    setValue((prev) => ({
      ...prev,
      email: user.email,
      name: user.displayName,
    }));
  }, [user, response]);

  // Function chaning empty values to "-"
  const transformValue = (value) => {
    return value === '' ? '-' : value;
  };
  // Function transforming data to match API model
  const transformBody = (value) => {
    let tempBody = [
      [
        (value.createdAt = new Date().toLocaleString('pl-PL')),
        value.email,
        value.name,
        // Object.values(value).map(val => val === '' ? '-':value)
        transformValue(value[1]),
        transformValue(value[2]),
        transformValue(value[3]),
        transformValue(value[4]),
        transformValue(value[4.1].toString()),
        transformValue(value[5].toString().concat(',', value5)),
        transformValue(value[6].toString().concat(',', value6)),
        transformValue(value[7]),
        transformValue(value[8]),
        transformValue(value[8.1]),
        transformValue(value[8.2]),
        transformValue(value[9]),
        transformValue(value[9.1]),
        transformValue(value[10]),
        transformValue(value[10.1]),
        transformValue(value[11]),
        transformValue(value[11.1]),
        transformValue(value[12]),
      ],
    ];

    return tempBody;
  };

  const fetchPOST = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        timeout: '0',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (data.message === 'Successfully Inserted') {
        setResponse(false);
        myAlert.success('Pomyślnie przesłano ankietę');
      } else {
        myAlert.error('Wystąpił problem z przesłaniem ankiety');
      }
    } catch (err) {
      myAlert.error('Wystąpił jakiś problem');
    }
  };

  const handleSubmit = async () => {
    fetchPOST(SHEET_URL, transformBody(value)).then(() =>
      delay(500).then(() => setResponse(true))
    );
    setValue(defaultValue);
  };

  return (
    <Box margin={{ horizontal: 'medium' }}>
      <Form
        value={value}
        onChange={(nextValue) => setValue(nextValue)}
        onSubmit={() => handleSubmit()}
        messages={{ required: 'Wymagane' }}
      >
        <FormField name='1' label='1. Inicjały pacjenta:' required>
          <TextInput
            name='1'
            placeholder='Twoja odpowiedź'
            minLength={1}
            maxLength={3}
          />
        </FormField>
        <FormField name='2' label='2. Wiek pacjenta:' required>
          <TextInput
            name='2'
            placeholder='Twoja odpowiedź'
            type='number'
            min={16}
            max={100}
          />
        </FormField>
        <FormField
          name='3'
          label='3. Jak długo pacjent stara się o potomstwo? (w miesiącach)'
          required
        >
          <TextInput
            name='3'
            placeholder='Twoja odpowiedź'
            type='number'
            min={0}
          />
        </FormField>
        <FormField
          name='4'
          type='number'
          label='4. Ile razy pacjent wykonał badania nasienia w czasie starań o ciążę?'
          required
        >
          <TextInput
            name='4'
            placeholder='Twoja odpowiedź'
            type='number'
            min={0}
          />
        </FormField>
        {value['4'] > 0 ? (
          <FormField name='4.1' label='4.1 Jeżli wykonywał, to jakie badania?'>
            <CheckBoxGroup
              name='4.1'
              options={[
                'Normospermia',
                'OAT I',
                'OAT II',
                'OAT III',
                'Cryptozoospermia',
                'Azoosspermia',
                'Aspermia',
              ]}
            />
          </FormField>
        ) : null}

        <FormField name='5' label='5. Choroby towarzyszące:'>
          <CheckBoxGroup
            name='5'
            options={[
              'Urologiczne',
              'Internistyczne',
              'Endokrynologiczne',
              'Chirurgiczne',
              'Onkologiczne',
            ]}
          />
          <TextInput
            name='5'
            value={value5}
            onChange={(event) => setValue5(event.target.value)}
            placeholder='Inne'
          />
        </FormField>
        <FormField
          name='6'
          label='6. Ocena ginekologiczna czynnika żeńskiego:'
          required
        >
          <CheckBoxGroup
            name='6'
            options={[
              'Płodna',
              'Zaburzenia owilacji',
              'PCOS',
              'Niedrożność jajowodów',
            ]}
          />
          <TextInput
            name='6'
            value={value6}
            onChange={(event) => setValue6(event.target.value)}
            placeholder='Inne'
          />
        </FormField>
        <FormField
          name='7'
          label='7. Czy pacjent chorował w ostatnim czasie na COVID?'
          required
        >
          <RadioButtonGroup
            name='7'
            options={[
              { id: '1', name: '7', value: 'Tak', label: 'Tak' },
              { id: '2', name: '7', value: 'Nie', label: 'Nie' },
            ]}
          />
        </FormField>
        <FormField
          name='8'
          label='8. Czy jest zaszczepiony przeciw SARS-COV-2?'
          required
        >
          <RadioButtonGroup
            name='8'
            options={[
              { id: '3', name: '8', value: 'Tak', label: 'Tak' },
              { id: '4', name: '8', value: 'Nie', label: 'Nie' },
            ]}
          />
        </FormField>
        {value['8'] === 'Tak' ? (
          <FormField name='8.1' label='8.1 Jeżeli tak, to ile dawek?'>
            <RadioButtonGroup
              name='8.1'
              options={[
                { id: '5', name: '8.1', value: '1', label: '1' },
                { id: '6', name: '8.1', value: '2', label: '2' },
              ]}
            />
          </FormField>
        ) : null}

        {value['8'] === 'Tak' ? (
          <FormField
            name='8.2'
            label='8.2 Czy wystąpiły odczyny poszczepienne?'
          >
            <RadioButtonGroup
              name='8.2'
              options={[
                { id: '7', name: '8.2', value: 'Tak', label: 'Tak' },
                { id: '8', name: '8.2', value: 'Nie', label: 'Nie' },
              ]}
            />
          </FormField>
        ) : null}

        <FormField
          name='9'
          label='9. Czy wykonywał badania nasienia w okresie około-COVID?'
          required
        >
          <RadioButtonGroup
            name='9'
            options={[
              { id: '9', name: '9', value: 'Tak', label: 'Tak' },
              { id: '10', name: '9', value: 'Nie', label: 'Nie' },
            ]}
          />
        </FormField>
        {value['9'] === 'Tak' ? (
          <FormField name='9.1' label='9.1 Jeśli tak, to czy nastąpiło:'>
            <RadioButtonGroup
              name='9.1'
              options={['Pogorszenie', 'Poprawa', 'Bez zmian']}
            />
          </FormField>
        ) : null}

        <FormField
          name='10'
          label='10. Czy była stosowana / stosuje terapia poprawiającą płodność?'
          required
        >
          <RadioButtonGroup
            name='10'
            options={[
              { id: '11', name: '10', value: 'Tak', label: 'Tak' },
              { id: '12', name: '10', value: 'Nie', label: 'Nie' },
            ]}
          />
        </FormField>
        {value['10'] === 'Tak' ? (
          <FormField name='10.1' label='10.1 Jeśli tak to jaka?'>
            <TextInput name='10.1' placeholder='Twoja odpowiedź' />
          </FormField>
        ) : null}

        <FormField
          name='11'
          label='11. Czy stosował / stosuje terapie stresu oksydacyjnego (suplementy)?'
          required
        >
          <RadioButtonGroup
            name='11'
            options={[
              { id: '13', name: '11', value: 'Tak', label: 'Tak' },
              { id: '14', name: '11', value: 'Nie', label: 'Nie' },
            ]}
          />
        </FormField>
        {value['11'] === 'Tak' ? (
          <FormField
            name='11.1'
            label='11.1 Jeśli tak, to jaki preparat i jak długo?'
          >
            <TextInput name='11.1' placeholder='Twoja odpowiedź' />
          </FormField>
        ) : null}

        <FormField name='12' label='12. Dodatkowy komentarz:'>
          <TextInput name='12' placeholder='Twoja odpowiedź' />
        </FormField>
        <Box margin='medium'>
          <Button
            type='submit'
            label='Prześlij'
            primary
            margin={{ bottom: 'large' }}
          />
        </Box>
      </Form>
    </Box>
  );
};

export default FirstForm;
