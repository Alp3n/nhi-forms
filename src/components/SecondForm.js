import { useContext, useState } from 'react';
import { ModalContext } from '../context/modalContext';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  RadioButtonGroup,
  Text,
  TextInput,
} from 'grommet';
import { Close } from 'grommet-icons';
import DoubleAnswer from './DoubleAnswer';
import { AuthContext } from '../context/authContext';
import { SHEET_2_URL } from '../utils/consts';
import { useAlert } from 'react-alert';

const defaultValue = {
  1: '',
  2: '',
  3: '',
  3.1: '',
  4: '',
  4.1: '',
  5: '',
  '5.1.1.przed': '',
  '5.1.1.po': '',
  '5.1.2.przed': '',
  '5.1.2.po': '',
  '5.1.3.przed': '',
  '5.1.3.po': '',
  '5.1.4.przed': '',
  '5.1.4.po': '',
  '5.1.5.przed': '',
  '5.1.5.po': '',
};

const SecondForm = ({ value3, setValue3, item }) => {
  const [value, setValue] = useState(defaultValue);
  const { user } = useContext(AuthContext);
  const { closeModal } = useContext(ModalContext);
  const myAlert = useAlert();

  // Function chaning empty values to "-"
  const transformValue = (value) => {
    return value === '' ? '-' : value;
  };
  // Function transforming data to match API model
  const transformBody = (value) => {
    let tempBody = [
      [
        (value.createdAt = new Date().toLocaleString('pl-PL')),
        user.email,
        user.displayName,
        item['1. Inicjały pacjenta:'],
        item['2. Wiek pacjenta:'],
        transformValue(value[1]),
        3,
        transformValue(value[3]),
        transformValue(value[3.1]),
        transformValue(value[4]),
        transformValue(value[4.1]),
        transformValue(value[5]),
        transformValue(value['5.1.1.przed']),
        transformValue(value['5.1.1.po']),
        transformValue(value['5.1.2.przed']),
        transformValue(value['5.1.2.po']),
        transformValue(value['5.1.3.przed']),
        transformValue(value['5.1.3.po']),
        transformValue(value['5.1.4.przed']),
        transformValue(value['5.1.4.po']),
        transformValue(value['5.1.5.przed']),
        transformValue(value['5.1.5.po']),
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
        // setResponse(false);
        myAlert.success('Pomyślnie przesłano ankietę');
      } else {
        myAlert.error('Wystąpił problem z przesłaniem ankiety');
      }
    } catch (err) {
      myAlert.error('Wystąpił jakiś problem');
    }
  };

  const handleSubmit = async () => {
    fetchPOST(
      SHEET_2_URL,
      transformBody(value)
    ); /* .then(() => setResponse(true)); */

    console.log(transformBody(value));
    setValue(defaultValue);
    closeModal();
  };

  return (
    <Box elevation='small' background='light-1' direction='column'>
      <Box
        direction='row'
        align='center'
        justify='between'
        background='portrait-2'
        pad='medium'
      >
        <Text weight='bold' size='large' style={{ whiteSpace: 'nowrap' }}>
          Ankieta po 3 miesiącach
        </Text>
        <Button reverse plain onClick={() => closeModal()} icon={<Close />} />
      </Box>
      <Box
        overflow='auto'
        margin={{ horizontal: 'medium' }}
        pad={{ vertical: 'small' }}
      >
        <Form
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          onSubmit={handleSubmit}
        >
          <FormField
            name='1'
            label='1. Czy pacjent stosował TENfertil ON wg charakterystyki produktu (2 x 2)?'
            required
          >
            <RadioButtonGroup
              name='1'
              options={[
                { id: '21', name: '1', value: 'Tak', label: 'Tak' },
                { id: '22', name: '1', value: 'Nie', label: 'Nie' },
              ]}
            />
          </FormField>
          <FormField
            name='2'
            label='2. Ile opakowań TENfertil ON zużył?'
            required
          >
            <CheckBox
              name='2'
              checked={value3}
              label='3'
              disabled={false}
              onChange={(event) => setValue3(event.target.checked)}
            />
          </FormField>
          <FormField
            name='3'
            label='3. Czy wystąpiły objawy niepożądane?'
            required
          >
            <RadioButtonGroup
              name='3'
              options={[
                { id: '23', name: '3', value: 'Tak', label: 'Tak' },
                { id: '24', name: '3', value: 'Nie', label: 'Nie' },
              ]}
            />
          </FormField>
          {value[3] ? (
            <FormField
              name='3.1'
              label='3.1 Jeśli tak, to jakie problemy zgłaszał pacjent?'
            >
              <TextInput name='3.1' type='text' placeholder='Twoja odpowiedź' />
            </FormField>
          ) : null}
          <FormField
            label='4. Czy w czasie stosowania TENfertil ON doszło do ciąży?'
            name='4'
            required
          >
            <RadioButtonGroup
              name='4'
              options={[
                { id: '25', name: '4', value: 'Tak', label: 'Tak' },
                { id: '26', name: '4', value: 'Nie', label: 'Nie' },
              ]}
            />
          </FormField>
          {value[4] ? (
            <FormField name='4.1' label='4.1 Jeżeli tak, to była to ciąża:'>
              <RadioButtonGroup
                name='4.1'
                options={['Naturalna', 'Po inseminacji', 'Po IVF']}
              />
            </FormField>
          ) : null}
          <FormField
            name='5'
            label='5. Czy pacjent wykonał badania nasienia?'
            required
          >
            <RadioButtonGroup
              name='5'
              options={[
                { id: '27', name: '5', value: 'Tak', label: 'Tak' },
                { id: '28', name: '5', value: 'Nie', label: 'Nie' },
              ]}
            />
          </FormField>
          {value[5] ? (
            <FormField label='5.1 Jeśli TAK, to jak wygląda porównanie jakości nasienia przed kuracją i po kuracji?'>
              <DoubleAnswer
                name1='5.1.1.przed'
                name2='5.1.1.po'
                label='Koncentracja w 1 ml'
              />
              <DoubleAnswer
                name1='5.1.2.przed'
                name2='5.1.2.po'
                label='W całym ejakulacie'
              />
              <DoubleAnswer
                name1='5.1.3.przed'
                name2='5.1.3.po'
                label='Ruchliwość postępowa plemników'
              />
              <DoubleAnswer
                name1='5.1.4.przed'
                name2='5.1.4.po'
                label='Morfologia plemników'
              />
              <DoubleAnswer
                name1='5.1.5.przed'
                name2='5.1.5.po'
                label='Posiew nasienia'
              />
            </FormField>
          ) : null}
          <Box pad='small'>
            <Button fill primary type='submit' label='Prześlij' />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default SecondForm;
