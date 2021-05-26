import { useEffect, useState, useContext } from 'react';
import { ModalContext } from '../context/modalContext';
import { Box, Button, CheckBoxGroup, Text, ResponsiveContext } from 'grommet';
import { ContactInfo } from 'grommet-icons';
import { SHEET_URL } from '../utils/consts';
import PatientDetails from './PatientDetails';

const PatientCard = ({ item }) => {
  const [value, setValue] = useState();
  const [disabled, setDisabled] = useState(true);
  const [changed, setChanged] = useState();

  const { openModal } = useContext(ModalContext);
  const size = useContext(ResponsiveContext);

  const handleChange = (value) => {
    setValue(value);
    setDisabled(value.length === 0 ? true : false);
    setChanged(Math.random());
  };

  useEffect(() => {
    const checkboxValues = [
      item['Pierwsze'],
      item['Drugie'],
      item['Trzecie'],
      item['Czwarte'],
      item['Piąte'],
    ];

    let cleanValues = checkboxValues.filter((obj) => obj !== undefined);

    setValue(cleanValues);
  }, [item]);

  const handleChangeSubmit = () => {
    //Fetch for PUT method
    const fetchPUT = async (url, data) => {
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    };

    const transformBody = (item, value) => {
      let tempBody = {
        ...item,
        Pierwsze: value.filter((val) => val === 'Pierwsze').toString(),
        Drugie: value.filter((val) => val === 'Drugie').toString(),
        Trzecie: value.filter((val) => val === 'Trzecie').toString(),
        Czwarte: value.filter((val) => val === 'Czwarte').toString(),
        Piąte: value.filter((val) => val === 'Piąte').toString(),
      };
      return tempBody;
    };

    const body = transformBody(item, value);

    fetchPUT(SHEET_URL, body);
    setChanged(false);
    alert('Zatwierdzono zmianę');
  };

  const handleCancel = () => {
    setChanged(false);
  };

  return (
    <Box background='light-2' elevation='small' round>
      <Box
        direction='row'
        justify='between'
        pad='medium'
        border={{ side: 'bottom' }}
      >
        <Box
          direction={size === 'small' ? 'column' : 'row'}
          gap='medium'
          align='start'
        >
          <Text>
            Inicjały: <Text weight='bold'>{item['1. Inicjały pacjenta:']}</Text>
          </Text>
          <Text>
            Wiek: <Text weight='bold'>{item['2. Wiek pacjenta:']}</Text>
          </Text>
          {/* <Text>
            Utworzono: <Text weight='bold'>{item['Sygnatura czasowa']}</Text>
          </Text> */}
        </Box>
        <Button
          label='Szczegóły'
          plain
          icon={<ContactInfo />}
          onClick={() => openModal(<PatientDetails item={item} />)}
        />
      </Box>
      <Box
        direction='column'
        pad='medium'
        justify='around'
        align='center'
        overflow='auto'
        gap='small'
      >
        <Text weight='bold'>Rekomendowana liczba opakowań</Text>
        <CheckBoxGroup
          direction='row'
          value={value}
          onChange={({ value }) => handleChange(value)}
          // options={['1', '2', '3', 'Wizyta kontrolna - ankieta', '5', 'Kontynuacja leczenia']}
          options={['Pierwsze', 'Drugie', 'Trzecie', 'Czwarte', 'Piąte']}
          pad={{ right: 'small' }}
        />
      </Box>
      {changed ? (
        <Box direction='row' justify='between'>
          <Button
            label='Anuluj'
            margin='small'
            disabled={disabled}
            onClick={() => handleCancel()}
          />
          <Button
            label='Zatwierdź'
            primary
            margin='small'
            disabled={disabled}
            onClick={() => handleChangeSubmit()}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default PatientCard;
