import { useContext } from 'react';
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

const SecondForm = ({ value3, setValue3 }) => {
  const { closeModal } = useContext(ModalContext);
  return (
    <Box elevation='small' background='light-1' direction='column'>
      <Box
        direction='row'
        align='center'
        justify='between'
        background='portrait-2'
        pad='medium'
      >
        <Text weight='bold' size='large'>
          Po 3 miesiącach
        </Text>
        <Button reverse plain onClick={() => closeModal()} icon={<Close />} />
      </Box>
      <Box
        overflow='auto'
        margin={{ horizontal: 'medium' }}
        pad={{ vertical: 'small' }}
      >
        <Form>
          <FormField
            label='1. Czy pacjent stosował TENfertil ON wg charakterystyki produktu (2 x 2)?'
            required
          >
            <RadioButtonGroup options={['Tak', 'Nie']} />
          </FormField>
          <FormField label='2. Ile zużył opakowań TENfertil ON?' required>
            <CheckBox
              checked={value3}
              label='3'
              disabled={false}
              onChange={(event) => setValue3(event.target.checked)}
            />
          </FormField>
          <FormField label='3. Czy wystąpiły objawy niepożądane?' required>
            <RadioButtonGroup options={['Tak', 'Nie']} />
          </FormField>
          <FormField label='3.1 Jeśli tak, to jakie problemy zgłaszał pacjent?'>
            <TextInput />
          </FormField>
          <FormField
            label='4. Czy w czasie stosowania TENfertil ON doszło do ciąży?'
            required
          >
            <RadioButtonGroup options={['Tak', 'Nie']} />
          </FormField>
          <FormField label='4.1 Jeżeli tak, to była to ciąża:'>
            <RadioButtonGroup
              options={['Naturalna', 'Po inseminacji', 'Po IVF']}
            />
          </FormField>
          <FormField label='5. Czy pacjent wykonał badania nasienia?' required>
            <RadioButtonGroup options={['Tak', 'Nie']} />
          </FormField>
          <FormField label='5.1 Jeśli TAK, to jak wygląda porównanie jakości nasienia przed kuracją i po kuracji?'>
            <Text margin={{ left: 'small' }}>Koncentracja w 1 ml przed/po</Text>
            <TextInput placeholder='przed / po' />
            <Text margin={{ left: 'small' }}>W całym ejakulacie przed/po</Text>
            <TextInput placeholder='przed / po' />
            <Text margin={{ left: 'small' }}>
              Ruchliwość postępowa plemników przed przed/po
            </Text>
            <TextInput placeholder='przed / po' />
            <Text margin={{ left: 'small' }}>
              Morfologia plemników przed/po
            </Text>
            <TextInput placeholder='przed / po' />
            <Text margin={{ left: 'small' }}>Posiew nasienia przed/po</Text>
            <TextInput placeholder='przed / po' />
          </FormField>
        </Form>
      </Box>
    </Box>
  );
};

export default SecondForm;
