import { useEffect, useState } from 'react';
import { Box, Button, CheckBoxGroup, Text } from 'grommet';
import { ContactInfo } from 'grommet-icons';
import { SHEET_URL } from '../utils/consts';

const PatientCard = ({ item }) => {
  const [value, setValue] = useState();

  const [fetchBody, setFetchBody] = useState();

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

  useEffect(() => {
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

    if (value) {
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
  
      const body = transformBody(item, value)
  
      // if (value !== undefined) {
      //   setFetchBody(transformBody(item, value));
      // }
  
      fetchPUT(SHEET_URL, body);
    }
  }, [value, item]);

  console.log(value);
  return (
    <Box background='light-2' round>
      <Box
        direction='row'
        justify='between'
        pad='medium'
        border={{ side: 'bottom' }}
      >
        <Box direction='row' gap='medium'>
          <Text weight='bold' size='large'>
            Inicjały: {item['1. Imię i nazwisko:']}
          </Text>
          <Text weight='bold' size='large'>
            Wiek: {item['2. Wiek pacjenta:']}
          </Text>
        </Box>
        <Button label='Szczegóły' plain icon={<ContactInfo />} />
      </Box>
      <Box direction='row' pad='medium' justify='around' align='center'>
        <Text>Opakowanie</Text>
        <CheckBoxGroup
          direction='row'
          value={value}
          // valueKey={'1'}
          onChange={({ value, option }) => setValue(value)}
          options={['Pierwsze', 'Drugie', 'Trzecie', 'Czwarte', 'Piąte']}
        />
      </Box>
    </Box>
  );
};

export default PatientCard;
